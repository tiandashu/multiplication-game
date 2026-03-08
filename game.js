// 9x9乘法口诀表挑战游戏
// 作者: 工匠
// 版本: 1.3.0

// 游戏状态
const gameState = {
    isPlaying: false,
    currentQuestion: 0,
    correctCount: 0,
    wrongCount: 0,
    totalTime: 0,
    questionStartTime: 0,
    currentAnswer: 0,
    canAnswer: true,
    studentName: '',
    studentClass: '',
    questionHistory: [], // 记录每道题的详细信息
    leaderboard: []
};

// DOM 元素
let welcomeScreen, gameScreen, resultScreen, questionDisplay, optionsGrid;
let currentQuestionEl, correctCountEl, avgTimeEl, progressFill, leaderboardList;
let studentNameInput, studentClassInput;
let finalStudentName, finalStudentClass, totalQuestionsEl, finalCorrectEl, finalWrongEl, accuracyEl;
let accuracyBars, finalAvgTime;
let historyTableBody;

// 选项存储
let currentOptions = [];

// 初始化
function init() {
    console.log('初始化游戏...');
    
    // 获取 DOM 元素
    welcomeScreen = document.getElementById('welcomeScreen');
    gameScreen = document.getElementById('gameScreen');
    resultScreen = document.getElementById('resultScreen');
    questionDisplay = document.getElementById('questionDisplay');
    optionsGrid = document.getElementById('optionsGrid');
    currentQuestionEl = document.getElementById('currentQuestion');
    correctCountEl = document.getElementById('correctCount');
    avgTimeEl = document.getElementById('avgTime');
    progressFill = document.getElementById('progressFill');
    leaderboardList = document.getElementById('leaderboardList');
    studentNameInput = document.getElementById('studentName');
    studentClassInput = document.getElementById('studentClass');
    finalStudentName = document.getElementById('finalStudentName');
    finalStudentClass = document.getElementById('finalStudentClass');
    totalQuestionsEl = document.getElementById('totalQuestions');
    finalCorrectEl = document.getElementById('finalCorrect');
    finalWrongEl = document.getElementById('finalWrong');
    accuracyEl = document.getElementById('accuracy');
    accuracyBars = document.getElementById('accuracyBars');
    finalAvgTime = document.getElementById('finalAvgTime');
    historyTableBody = document.getElementById('historyTableBody');

    // 加载排行榜
    loadLeaderboard();
    renderLeaderboard();
    
    // 绑定按钮事件
    document.getElementById('startGameBtn').addEventListener('click', startGame);
    document.getElementById('stopGameBtn').addEventListener('click', stopGame);
    document.getElementById('restartBtn').addEventListener('click', startGame);
    document.getElementById('homeBtn').addEventListener('click', showWelcome);
    
    // 暴露函数到全局对象（供 HTML onclick 使用）
    window.game = {
        selectAnswer: selectAnswer
    };
    
    console.log('初始化完成');
}

// 开始游戏
function startGame() {
    console.log('开始游戏');
    
    // 获取学生信息
    gameState.studentName = studentNameInput.value.trim() || '匿名学生';
    gameState.studentClass = studentClassInput.value.trim() || '';
    
    console.log('学生信息:', gameState.studentName, gameState.studentClass);
    
    // 重置游戏状态
    gameState.isPlaying = true;
    gameState.currentQuestion = 0;
    gameState.correctCount = 0;
    gameState.wrongCount = 0;
    gameState.totalTime = 0;
    gameState.canAnswer = true;
    gameState.questionHistory = [];
    
    console.log('游戏状态重置:', gameState);

    welcomeScreen.style.display = 'none';
    resultScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    updateStats();
    nextQuestion();
}

// 下一题
function nextQuestion() {
    gameState.currentQuestion++;
    gameState.canAnswer = true;

    // 生成题目 (1-9 之间的乘法)
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    gameState.currentAnswer = num1 * num2;

    // 显示题目
    questionDisplay.textContent = `${num1} × ${num2} = ?`;

    // 生成选项 (1个正确 + 3个错误)
    currentOptions = generateOptions(gameState.currentAnswer);
    renderOptions(currentOptions);

    // 记录开始时间
    gameState.questionStartTime = Date.now();

    // 更新统计
    updateStats();
}

// 生成选项
function generateOptions(correctAnswer) {
    const options = [correctAnswer];

    // 生成3个混淆项
    while (options.length < 4) {
        let wrongAnswer;
        // 50% 概率生成接近的答案，50% 概率生成随机答案
        if (Math.random() > 0.5) {
            const offset = Math.floor(Math.random() * 5) + 1;
            wrongAnswer = correctAnswer + (Math.random() > 0.5 ? offset : -offset);
        } else {
            wrongAnswer = Math.floor(Math.random() * 81) + 1; // 9x9=81
        }

        // 确保答案是正数且不重复
        if (wrongAnswer > 0 && !options.includes(wrongAnswer)) {
            options.push(wrongAnswer);
        }
    }

    // 打乱顺序
    return shuffleArray(options);
}

// 打乱数组
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// 渲染选项
function renderOptions(options) {
    optionsGrid.innerHTML = '';
    options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.dataset.value = option;
        btn.onclick = () => selectAnswer(option, btn);
        optionsGrid.appendChild(btn);
    });
}

// 选择答案
function selectAnswer(answer, btn) {
    console.log('选择答案:', answer);
    console.log('当前答案:', gameState.currentAnswer);
    
    if (!gameState.isPlaying || !gameState.canAnswer) {
        console.log('游戏未开始或已禁用');
        return;
    }

    gameState.canAnswer = false;

    // 计算用时
    const timeUsed = (Date.now() - gameState.questionStartTime) / 1000;
    gameState.totalTime += timeUsed;

    // 检查答案
    const isCorrect = parseInt(answer) === gameState.currentAnswer;
    
    console.log('是否正确:', isCorrect);
    console.log('用户答案（解析后）:', parseInt(answer));
    
    // 记录这道题的详细信息
    const record = {
        questionNumber: gameState.currentQuestion,
        question: questionDisplay.textContent,
        userAnswer: answer,
        correctAnswer: gameState.currentAnswer,
        isCorrect: isCorrect,
        timeUsed: timeUsed.toFixed(2)
    };
    
    gameState.questionHistory.push(record);
    
    console.log('答题记录:', record);

    if (isCorrect) {
        gameState.correctCount++;
        console.log('正确数增加到:', gameState.correctCount);
        btn.classList.add('correct');
    } else {
        gameState.wrongCount++;
        console.log('错误数增加到:', gameState.wrongCount);
        btn.classList.add('wrong');
        // 高亮正确答案
        const allBtns = optionsGrid.querySelectorAll('.option-btn');
        allBtns.forEach(button => {
            if (parseInt(button.dataset.value) === gameState.currentAnswer) {
                button.classList.add('correct');
            }
        });
    }

    // 禁用所有按钮
    const allBtns = optionsGrid.querySelectorAll('.option-btn');
    allBtns.forEach(button => {
        button.disabled = true;
    });

    // 更新统计
    console.log('调用 updateStats 前，correctCount:', gameState.correctCount);
    updateStats();
    console.log('调用 updateStats 后');

    // 延迟后进入下一题
    setTimeout(() => {
        nextQuestion();
    }, 800);
}

// 更新统计
function updateStats() {
    currentQuestionEl.textContent = gameState.currentQuestion;
    correctCountEl.textContent = gameState.correctCount;

    if (gameState.currentQuestion > 0) {
        const avgTime = (gameState.totalTime / gameState.currentQuestion).toFixed(2);
        avgTimeEl.textContent = avgTime;
    }

    // 更新进度条
    const progress = Math.min((gameState.currentQuestion / 10) * 100, 100);
    progressFill.style.width = `${progress}%`;
}

// 停止游戏
function stopGame() {
    if (!gameState.isPlaying) {
        return;
    }

    gameState.isPlaying = false;

    // 计算统计数据
    const avgTime = gameState.currentQuestion > 0
        ? (gameState.totalTime / gameState.currentQuestion).toFixed(2)
        : 0;
    const accuracy = gameState.currentQuestion > 0
        ? ((gameState.correctCount / gameState.currentQuestion) * 100).toFixed(1)
        : 0;

    // 保存到排行榜
    if (gameState.currentQuestion >= 5) { // 至少答对5题才进入排行榜
        saveToLeaderboard(avgTime, gameState.correctCount, gameState.currentQuestion);
    }

    // 显示结果
    finalStudentName.textContent = gameState.studentName;
    finalStudentClass.textContent = gameState.studentClass || '未填写';
    finalAvgTime.textContent = `${avgTime}秒`;
    totalQuestionsEl.textContent = gameState.currentQuestion;
    finalCorrectEl.textContent = gameState.correctCount;
    finalWrongEl.textContent = gameState.wrongCount;
    accuracyEl.textContent = `${accuracy}%`;

    // 显示正确率分析
    renderAccuracyChart();

    // 显示答题记录表格
    renderHistoryTable();

    gameScreen.style.display = 'none';
    resultScreen.style.display = 'block';

    // 更新排行榜
    renderLeaderboard();
}

// 渲染正确率图表
function renderAccuracyChart() {
    if (gameState.questionHistory.length === 0) {
        accuracyBars.innerHTML = '<p class="text-center text-muted">暂无答题记录</p>';
        return;
    }

    // 按题型分类（乘数范围）
    const range1 = gameState.questionHistory.filter(q => q.correctAnswer <= 20); // 1-20
    const range2 = gameState.questionHistory.filter(q => q.correctAnswer > 20 && q.correctAnswer <= 50); // 21-50
    const range3 = gameState.questionHistory.filter(q => q.correctAnswer > 50); // 51-81

    const total = gameState.questionHistory.length;
    const accuracy1 = range1.length > 0 ? ((range1.filter(r => r.isCorrect).length / range1.length) * 100).toFixed(1) : 0;
    const accuracy2 = range2.length > 0 ? ((range2.filter(r => r.isCorrect).length / range2.length) * 100).toFixed(1) : 0;
    const accuracy3 = range3.length > 0 ? ((range3.filter(r => r.isCorrect).length / range3.length) * 100).toFixed(1) : 0;

    accuracyBars.innerHTML = `
        <div class="chart-label">简单 (1-20): ${accuracy1}% (${range1.length}题)</div>
        <div class="chart-bar">
            <div class="chart-fill" style="width: ${accuracy1}%">${accuracy1}%</div>
        </div>
        <div class="chart-label">中等 (21-50): ${accuracy2}% (${range2.length}题)</div>
        <div class="chart-bar">
            <div class="chart-fill" style="width: ${accuracy2}%">${accuracy2}%</div>
        </div>
        <div class="chart-label">困难 (51-81): ${accuracy3}% (${range3.length}题)</div>
        <div class="chart-bar">
            <div class="chart-fill" style="width: ${accuracy3}%">${accuracy3}%</div>
        </div>
        <div class="chart-label">总体正确率: ${((gameState.correctCount / total) * 100).toFixed(1)}%</div>
        <div class="chart-bar">
            <div class="chart-fill" style="width: ${((gameState.correctCount / total) * 100).toFixed(1)}%">${((gameState.correctCount / total) * 100).toFixed(1)}%</div>
        </div>
    `;
}

// 渲染答题记录表格
function renderHistoryTable() {
    if (gameState.questionHistory.length === 0) {
        historyTableBody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">暂无答题记录</td></tr>';
        return;
    }

    historyTableBody.innerHTML = gameState.questionHistory.map((record, index) => {
        const resultClass = record.isCorrect ? 'history-correct' : 'history-wrong';
        const resultText = record.isCorrect ? '✓ 正确' : '✗ 错误';

        return `
            <tr>
                <td>${record.questionNumber}</td>
                <td>${record.question}</td>
                <td>${record.userAnswer}</td>
                <td>${record.correctAnswer}</td>
                <td class="${resultClass}">${resultText}</td>
                <td class="history-time">${record.timeUsed}秒</td>
            </tr>
        `;
    }).join('');
}

// 保存到排行榜
function saveToLeaderboard(avgTime, correctCount, totalQuestions) {
    const record = {
        date: new Date().toLocaleDateString('zh-CN'),
        name: gameState.studentName,
        class: gameState.studentClass,
        avgTime: parseFloat(avgTime),
        correctCount: correctCount,
        wrongCount: gameState.wrongCount,
        totalQuestions: totalQuestions,
        accuracy: ((correctCount / totalQuestions) * 100).toFixed(1),
        questionHistory: gameState.questionHistory
    };

    gameState.leaderboard.push(record);

    // 按平均用时排序（用时越少排名越高）
    gameState.leaderboard.sort((a, b) => a.avgTime - b.avgTime);

    // 只保留前10名
    if (gameState.leaderboard.length > 10) {
        gameState.leaderboard = gameState.leaderboard.slice(0, 10);
    }

    // 保存到 localStorage
    localStorage.setItem('multiplicationGameLeaderboard', JSON.stringify(gameState.leaderboard));
}

// 加载排行榜
function loadLeaderboard() {
    const saved = localStorage.getItem('multiplicationGameLeaderboard');
    if (saved) {
        try {
            gameState.leaderboard = JSON.parse(saved);
        } catch (e) {
            console.error('Failed to load leaderboard:', e);
            gameState.leaderboard = [];
        }
    }
}

// 渲染排行榜
function renderLeaderboard() {
    if (gameState.leaderboard.length === 0) {
        leaderboardList.innerHTML = '<p class="text-center text-muted">暂无记录</p>';
        return;
    }

    leaderboardList.innerHTML = gameState.leaderboard.map((record, index) => {
        const rankClass = index < 3 ? `rank-${index + 1}` : '';
        const rankIcon = index < 3 ? getRankIcon(index) : '';
        const rank = index + 1;

        return `
            <div class="leaderboard-item ${rankClass}">
                <div class="leaderboard-rank">
                    ${rankIcon || rank}
                </div>
                <div class="leaderboard-info">
                    <div class="leaderboard-name">${record.name}</div>
                    <div class="leaderboard-date">${record.date}</div>
                    <div style="font-size: 0.9rem; color: #666;">
                        ${record.class ? `班级: ${record.class}` : ''}
                    </div>
                    <div>
                        正确率: <strong>${record.accuracy}%</strong>
                        (${record.correctCount}/${record.totalQuestions})
                    </div>
                </div>
                <div class="leaderboard-time">
                    ${record.avgTime.toFixed(2)}秒
                </div>
            </div>
        `;
    }).join('');
}

// 获取排名图标
function getRankIcon(rank) {
    const icons = ['🥇', '🥈', '🥉'];
    return icons[rank];
}

// 显示欢迎屏幕
function showWelcome() {
    resultScreen.style.display = 'none';
    gameScreen.style.display = 'none';
    welcomeScreen.style.display = 'block';
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
