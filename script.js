// 游戏状态
let gameState = {
    isPlaying: false,
    questionNumber: 0,
    correctCount: 0,
    startTime: null,
    questionStartTime: null,
    answerTimes: [],
    currentAnswer: null
};

// 生成乘法口诀表
const multiplicationTable = [];
for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= i; j++) {
        multiplicationTable.push({
            a: i,
            b: j,
            answer: i * j
        });
    }
}

// DOM 元素
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const leaderboardScreen = document.getElementById('leaderboard-screen');

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const questionNumberEl = document.getElementById('question-number');
const timerEl = document.getElementById('timer');
const accuracyEl = document.getElementById('accuracy');

// 更新计时器
let timerInterval;
function updateTimer() {
    if (!gameState.isPlaying) return;
    const elapsed = (Date.now() - gameState.questionStartTime) / 1000;
    timerEl.textContent = elapsed.toFixed(1) + 's';
}

// 开始游戏
function startGame() {
    gameState.isPlaying = true;
    gameState.questionNumber = 0;
    gameState.correctCount = 0;
    gameState.answerTimes = [];

    showScreen('game');
    nextQuestion();

    // 启动计时器
    timerInterval = setInterval(updateTimer, 100);
}

// 下一题
function nextQuestion() {
    gameState.questionNumber++;
    questionNumberEl.textContent = gameState.questionNumber;
    gameState.questionStartTime = Date.now();

    // 随机选择一道题
    const question = multiplicationTable[Math.floor(Math.random() * multiplicationTable.length)];
    gameState.currentAnswer = question.answer;

    // 显示题目
    questionEl.textContent = `${question.a} × ${question.b} = ?`;

    // 生成答案选项（1个正确 + 3个错误）
    generateAnswers(question.answer);

    // 重置计时器显示
    timerEl.textContent = '0.0s';
}

// 生成答案选项
function generateAnswers(correctAnswer) {
    const answers = [correctAnswer];
    const allAnswers = new Set(multiplicationTable.map(q => q.answer));

    // 生成3个错误的答案
    while (answers.length < 4) {
        const randomAnswer = Array.from(allAnswers)[Math.floor(Math.random() * allAnswers.length)];
        if (!answers.includes(randomAnswer)) {
            answers.push(randomAnswer);
        }
    }

    // 打乱答案顺序
    shuffleArray(answers);

    // 渲染答案选项
    answersEl.innerHTML = '';
    answers.forEach(answer => {
        const btn = document.createElement('button');
        btn.className = 'answer';
        btn.textContent = answer;
        btn.onclick = () => selectAnswer(answer, btn);
        answersEl.appendChild(btn);
    });
}

// 打乱数组
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 选择答案
function selectAnswer(answer, btn) {
    if (!gameState.isPlaying) return;

    const isCorrect = answer === gameState.currentAnswer;

    // 记录用时
    const timeSpent = (Date.now() - gameState.questionStartTime) / 1000;
    gameState.answerTimes.push({
        correct: isCorrect,
        time: timeSpent
    });

    if (isCorrect) {
        gameState.correctCount++;
        btn.classList.add('correct');
    } else {
        btn.classList.add('wrong');
        // 显示正确答案
        const correctBtn = Array.from(answersEl.children).find(
            b => b.textContent === gameState.currentAnswer
        );
        if (correctBtn) {
            correctBtn.classList.add('correct');
        }
    }

    // 更新正确率
    updateAccuracy();

    // 延迟后进入下一题
    setTimeout(() => {
        nextQuestion();
    }, 500);
}

// 更新正确率
function updateAccuracy() {
    const accuracy = (gameState.correctCount / gameState.questionNumber) * 100;
    accuracyEl.textContent = Math.round(accuracy) + '%';
}

// 停止游戏
function stopGame() {
    gameState.isPlaying = false;
    clearInterval(timerInterval);

    // 计算统计数据
    const totalQuestions = gameState.questionNumber;
    const avgTime = totalQuestions > 0
        ? gameState.answerTimes.reduce((sum, a) => sum + a.time, 0) / totalQuestions
        : 0;
    const accuracy = totalQuestions > 0
        ? (gameState.correctCount / totalQuestions) * 100
        : 0;

    // 显示结果
    document.getElementById('total-questions').textContent = totalQuestions;
    document.getElementById('correct-count').textContent = gameState.correctCount;
    document.getElementById('final-accuracy').textContent = Math.round(accuracy) + '%';
    document.getElementById('avg-time').textContent = avgTime.toFixed(1) + 's';

    // 保存记录
    saveRecord(totalQuestions, avgTime);

    // 显示当前排行榜
    showCurrentRankings(avgTime);

    showScreen('result');
}

// 保存记录
function saveRecord(totalQuestions, avgTime) {
    const records = JSON.parse(localStorage.getItem('multiplicationRecords') || '[]');
    records.push({
        date: new Date().toLocaleString('zh-CN'),
        totalQuestions,
        correctCount: gameState.correctCount,
        avgTime
    });
    localStorage.setItem('multiplicationRecords', JSON.stringify(records));
}

// 显示当前排行榜（本局排名）
function showCurrentRankings(avgTime) {
    const records = JSON.parse(localStorage.getItem('multiplicationRecords') || '[]');
    const sortedRecords = records.slice(-10).sort((a, b) => a.avgTime - b.avgTime);

    const rankingsEl = document.getElementById('current-rankings');
    if (sortedRecords.length === 0) {
        rankingsEl.innerHTML = '<p class="no-records">暂无记录</p>';
        return;
    }

    rankingsEl.innerHTML = sortedRecords
        .map((record, index) => `
            <div class="rank-item">
                <div class="rank-info">
                    <span class="rank-number">#${index + 1}</span>
                    <div>
                        <div class="rank-time">${record.avgTime.toFixed(1)}s/题</div>
                        <div class="rank-date">${record.date}</div>
                    </div>
                </div>
                <div class="rank-stats">
                    <div>${record.correctCount}/${record.totalQuestions}</div>
                </div>
            </div>
        `)
        .join('');
}

// 显示历史排行榜
function showLeaderboard() {
    const records = JSON.parse(localStorage.getItem('multiplicationRecords') || '[]');
    const sortedRecords = records.sort((a, b) => a.avgTime - b.avgTime).slice(0, 10);

    const leaderboardEl = document.getElementById('leaderboard');
    const noRecordsEl = document.getElementById('no-records');

    if (sortedRecords.length === 0) {
        leaderboardEl.innerHTML = '';
        noRecordsEl.classList.remove('hidden');
    } else {
        noRecordsEl.classList.add('hidden');
        leaderboardEl.innerHTML = sortedRecords
            .map((record, index) => `
                <div class="rank-item">
                    <div class="rank-info">
                        <span class="rank-number">#${index + 1}</span>
                        <div>
                            <div class="rank-time">${record.avgTime.toFixed(1)}s/题</div>
                            <div class="rank-date">${record.date}</div>
                        </div>
                    </div>
                    <div class="rank-stats">
                        <div>${record.correctCount}/${record.totalQuestions}</div>
                        <div>正确率 ${Math.round((record.correctCount / record.totalQuestions) * 100)}%</div>
                    </div>
                </div>
            `)
            .join('');
    }

    showScreen('leaderboard');
}

// 切换屏幕
function showScreen(screenName) {
    const screens = ['start', 'game', 'result', 'leaderboard'];
    screens.forEach(name => {
        const screenEl = document.getElementById(name + '-screen');
        if (screenEl) {
            if (name === screenName) {
                screenEl.classList.add('active');
                screenEl.classList.remove('hidden');
            } else {
                screenEl.classList.remove('active');
                screenEl.classList.add('hidden');
            }
        }
    });
}

// 事件监听
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('stop-btn').addEventListener('click', stopGame);
document.getElementById('restart-btn').addEventListener('click', () => {
    showScreen('start');
});
document.getElementById('view-leaderboard-btn').addEventListener('click', showLeaderboard);
document.getElementById('back-to-result-btn').addEventListener('click', () => {
    showScreen('result');
});

// 初始化
showScreen('start');
