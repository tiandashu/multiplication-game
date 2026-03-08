// 9x9乘法口诀表挑战游戏 v3.0
// 作者: 工匠
// 简化版：直接开始游戏，不收集学生信息

console.log('========================================');
console.log('   9x9乘法口诀表挑战 v3.0');
console.log('   作者: 工匠');
console.log('========================================');
console.log('');

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
    leaderboard: []
};

// DOM 元素
let gameScreen, resultScreen, questionDisplay, optionsGrid;
let currentQuestionEl, correctCountEl, avgTimeEl, progressFill, leaderboardList;
let finalAvgTime, totalQuestionsEl, finalCorrectEl, finalWrongEl, accuracyEl;

// 选项存储
let currentOptions = [];

// 初始化
function init() {
    console.log('========================================');
    console.log('   初始化游戏 v3.0...');
    console.log('========================================');
    console.log('');
    
    // 获取 DOM 元素
    gameScreen = document.getElementById('gameScreen');
    resultScreen = document.getElementById('resultScreen');
    questionDisplay = document.getElementById('questionDisplay');
    optionsGrid = document.getElementById('optionsGrid');
    currentQuestionEl = document.getElementById('currentQuestion');
    correctCountEl = document.getElementById('correctCount');
    avgTimeEl = document.getElementById('avgTime');
    progressFill = document.getElementById('progressFill');
    leaderboardList = document.getElementById('leaderboardList');
    finalAvgTime = document.getElementById('finalAvgTime');
    totalQuestionsEl = document.getElementById('totalQuestions');
    finalCorrectEl = document.getElementById('finalCorrect');
    finalWrongEl = document.getElementById('finalWrong');
    accuracyEl = document.getElementById('accuracy');

    // 检查 DOM 元素是否获取成功
    console.log('DOM 元素检查:');
    console.log('  gameScreen:', !!gameScreen);
    console.log('  resultScreen:', !!resultScreen);
    console.log('  questionDisplay:', !!questionDisplay);
    console.log('  optionsGrid:', !!optionsGrid);
    console.log('  currentQuestionEl:', !!currentQuestionEl);
    console.log('  correctCountEl:', !!correctCountEl);
    console.log('  avgTimeEl:', !!avgTimeEl);
    console.log('  progressFill:', !!progressFill);
    console.log('  leaderboardList:', !!leaderboardList);
    console.log('  finalAvgTime:', !!finalAvgTime);
    console.log('  totalQuestionsEl:', !!totalQuestionsEl);
    console.log('  finalCorrectEl:', !!finalCorrectEl);
    console.log('  finalWrongEl:', !!finalWrongEl);
    console.log('  accuracyEl:', !!accuracyEl);
    console.log('');
    
    // 绑定按钮事件
    console.log('绑定按钮事件...');
    const stopBtn = document.getElementById('stopGameBtn');
    const restartBtn = document.getElementById('restartBtn');
    
    if (stopBtn) {
        const newStopBtn = stopBtn.cloneNode(true);
        stopBtn.parentNode.replaceChild(newStopBtn, stopBtn);
        
        newStopBtn.addEventListener('click', stopGame);
        console.log('  ✓ stopGameBtn 事件已绑定');
    }
    
    if (restartBtn) {
        const newRestartBtn = restartBtn.cloneNode(true);
        restartBtn.parentNode.replaceChild(newRestartBtn, restartBtn);
        
        newRestartBtn.addEventListener('click', startGame);
        console.log('  ✓ restartBtn 事件已绑定');
    }
    
    console.log('');
    
    // 加载排行榜
    loadLeaderboard();
    console.log('  ✓ 排行榜已加载');
    
    renderLeaderboard();
    console.log('  ✓ 排行榜已渲染');
    
    console.log('');
    console.log('========================================');
    console.log('   初始化完成！');
    console.log('========================================');
}

// 开始游戏
function startGame() {
    console.log('========================================');
    console.log('   开始游戏 v3.0');
    console.log('========================================');
    console.log('');
    
    // 重置游戏状态
    gameState.isPlaying = true;
    gameState.currentQuestion = 0;
    gameState.correctCount = 0;
    gameState.wrongCount = 0;
    gameState.totalTime = 0;
    gameState.canAnswer = true;
    
    console.log('游戏状态重置:', {
        isPlaying: gameState.isPlaying,
        currentQuestion: gameState.currentQuestion,
        correctCount: gameState.correctCount,
        wrongCount: gameState.wrongCount
    });
    console.log('');

    resultScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    console.log('显示游戏屏幕');
    console.log('');

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

// 渲染选项（直接绑定点击事件）
function renderOptions(options) {
    console.log('渲染选项...');
    console.log('  清空 optionsGrid...');
    
    // 清空旧按钮
    optionsGrid.innerHTML = '';
    
    options.forEach((option, index) => {
        console.log(`  创建按钮 ${index}: ${option}`);
        
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.dataset.index = index;
        btn.dataset.value = option;
        
        // 直接在按钮上绑定点击事件
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('');
            console.log('========================================');
            console.log('   按钮点击事件被触发！');
            console.log('========================================');
            console.log('  index:', index);
            console.log('  option:', option);
            console.log('  dataset.index:', btn.dataset.index);
            console.log('  dataset.value:', btn.dataset.value);
            
            selectAnswer(options[index], btn, index);
        });
        
        optionsGrid.appendChild(btn);
    });
    
    const buttons = optionsGrid.querySelectorAll('.option-btn');
    console.log(`  ✓ optionsGrid 中共有 ${buttons.length} 个按钮`);
    console.log('  ✓ 渲染完成');
}

// 选择答案
function selectAnswer(answer, btn, index) {
    console.log('========================================');
    console.log('   selectAnswer 被调用 v3.0');
    console.log('========================================');
    
    console.log('answer:', answer);
    console.log('btn:', btn);
    console.log('index:', index);
    console.log('gameState.currentAnswer:', gameState.currentAnswer);
    console.log('gameState.isPlaying:', gameState.isPlaying);
    console.log('gameState.canAnswer:', gameState.canAnswer);
    
    if (!gameState.isPlaying || !gameState.canAnswer) {
        console.log('游戏未开始或已禁用，返回');
        return;
    }

    gameState.canAnswer = false;

    // 计算用时
    const timeUsed = (Date.now() - gameState.questionStartTime) / 1000;
    gameState.totalTime += timeUsed;

    // 检查答案
    const isCorrect = parseInt(answer) === parseInt(gameState.currentAnswer);
    
    console.log('答案比较:');
    console.log('  用户的答案:', answer, '(类型:', typeof answer, ')');
    console.log('  解析后的答案:', parseInt(answer));
    console.log('  正确答案:', gameState.currentAnswer);
    console.log('  解析后的正确答案:', parseInt(gameState.currentAnswer));
    console.log('  是否正确:', isCorrect);

    if (isCorrect) {
        gameState.correctCount++;
        console.log('✓ 答案正确，正确数增加到:', gameState.correctCount);
        btn.classList.add('correct');
    } else {
        gameState.wrongCount++;
        console.log('✗ 答案错误，错误数增加到:', gameState.wrongCount);
        btn.classList.add('wrong');
        // 高亮正确答案
        const allBtns = optionsGrid.querySelectorAll('.option-btn');
        allBtns.forEach(button => {
            if (parseInt(button.dataset.value) === parseInt(gameState.currentAnswer)) {
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
    console.log('调用 updateStats 后，correctCount:', gameState.correctCount);
    console.log('');
    
    // 延迟后进入下一题
    setTimeout(() => {
        nextQuestion();
    }, 800);
}

// 更新统计
function updateStats() {
    console.log('更新统计:');
    console.log('  currentQuestion:', gameState.currentQuestion);
    console.log('  correctCount:', gameState.correctCount);
    
    currentQuestionEl.textContent = gameState.currentQuestion;
    correctCountEl.textContent = gameState.correctCount;

    if (gameState.currentQuestion > 0) {
        const avgTime = (gameState.totalTime / gameState.currentQuestion).toFixed(2);
        avgTimeEl.textContent = avgTime;
    }

    // 更新进度条
    const progress = Math.min((gameState.currentQuestion / 10) * 100, 100);
    progressFill.style.width = `${progress}%`;
    
    console.log('  ✓ 更新完成');
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
    finalAvgTime.textContent = `${avgTime}秒`;
    totalQuestionsEl.textContent = gameState.currentQuestion;
    finalCorrectEl.textContent = gameState.correctCount;
    finalWrongEl.textContent = gameState.wrongCount;
    accuracyEl.textContent = `${accuracy}%`;

    gameScreen.style.display = 'none';
    resultScreen.style.display = 'block';

    // 更新排行榜
    renderLeaderboard();
}

// 保存到排行榜
function saveToLeaderboard(avgTime, correctCount, totalQuestions) {
    const record = {
        date: new Date().toLocaleDateString('zh-CN'),
        name: '匿名学生',
        avgTime: parseFloat(avgTime),
        correctCount: correctCount,
        wrongCount: gameState.wrongCount,
        totalQuestions: totalQuestions,
        accuracy: ((correctCount / totalQuestions) * 100).toFixed(1)
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

// 页面加载完成后初始化并自动开始游戏
document.addEventListener('DOMContentLoaded', () => {
    init();
    // 自动开始游戏
    setTimeout(() => {
        startGame();
    }, 500);
});
