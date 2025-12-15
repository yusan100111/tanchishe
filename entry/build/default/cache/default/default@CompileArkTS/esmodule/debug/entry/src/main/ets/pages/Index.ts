if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    // 游戏配置 - 10×10固定场地
    gridSize?: number;
    cellSize?: number;
    snake?: Array<[
        number,
        number
    ]>;
    food?: [
        number,
        number
    ];
    currentDirection?: string;
    queuedDirection?: string;
    gameOver?: boolean;
    score?: number;
    paused?: boolean;
    message?: string;
    difficulty?: number;
    isSelectingDifficulty?: boolean;
    foodEaten?: number;
    levelComplete?: boolean;
    maxFoodTarget?: number;
    isMoving?: boolean;
    // 游戏计时
    gameSpeed?: number;
    timerId?: number;
    lastMoveTime?: number;
    gridData?: Array<Array<string>>;
    // 难度配置
    difficultySpeeds?: number[];
}
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.gridSize = 10 // 10×10的场地
        ;
        this.cellSize = 28 // 每个格子28像素（更大一些）
        ;
        this.__snake = new ObservedPropertyObjectPU([[5, 5], [4, 5], [3, 5]] // 初始在中心
        , this, "snake");
        this.__food = new ObservedPropertyObjectPU([7, 5], this, "food");
        this.__currentDirection = new ObservedPropertySimplePU('right' // 当前移动方向
        , this, "currentDirection");
        this.__queuedDirection = new ObservedPropertySimplePU('right' // 排队的下一个方向
        , this, "queuedDirection");
        this.__gameOver = new ObservedPropertySimplePU(false, this, "gameOver");
        this.__score = new ObservedPropertySimplePU(0, this, "score");
        this.__paused = new ObservedPropertySimplePU(false, this, "paused");
        this.__message = new ObservedPropertySimplePU('《玉散江作业》贪吃蛇', this, "message");
        this.__difficulty = new ObservedPropertySimplePU(5, this, "difficulty");
        this.__isSelectingDifficulty = new ObservedPropertySimplePU(true, this, "isSelectingDifficulty");
        this.__foodEaten = new ObservedPropertySimplePU(0, this, "foodEaten");
        this.__levelComplete = new ObservedPropertySimplePU(false, this, "levelComplete");
        this.__maxFoodTarget = new ObservedPropertySimplePU(5, this, "maxFoodTarget");
        this.__isMoving = new ObservedPropertySimplePU(false
        // 游戏计时
        , this, "isMoving");
        this.gameSpeed = 300;
        this.timerId = 0;
        this.lastMoveTime = 0;
        this.__gridData = new ObservedPropertyObjectPU([]
        // 难度配置
        , this, "gridData");
        this.difficultySpeeds = [500, 450, 400, 350, 300, 250, 200, 150, 100, 50];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.gridSize !== undefined) {
            this.gridSize = params.gridSize;
        }
        if (params.cellSize !== undefined) {
            this.cellSize = params.cellSize;
        }
        if (params.snake !== undefined) {
            this.snake = params.snake;
        }
        if (params.food !== undefined) {
            this.food = params.food;
        }
        if (params.currentDirection !== undefined) {
            this.currentDirection = params.currentDirection;
        }
        if (params.queuedDirection !== undefined) {
            this.queuedDirection = params.queuedDirection;
        }
        if (params.gameOver !== undefined) {
            this.gameOver = params.gameOver;
        }
        if (params.score !== undefined) {
            this.score = params.score;
        }
        if (params.paused !== undefined) {
            this.paused = params.paused;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.difficulty !== undefined) {
            this.difficulty = params.difficulty;
        }
        if (params.isSelectingDifficulty !== undefined) {
            this.isSelectingDifficulty = params.isSelectingDifficulty;
        }
        if (params.foodEaten !== undefined) {
            this.foodEaten = params.foodEaten;
        }
        if (params.levelComplete !== undefined) {
            this.levelComplete = params.levelComplete;
        }
        if (params.maxFoodTarget !== undefined) {
            this.maxFoodTarget = params.maxFoodTarget;
        }
        if (params.isMoving !== undefined) {
            this.isMoving = params.isMoving;
        }
        if (params.gameSpeed !== undefined) {
            this.gameSpeed = params.gameSpeed;
        }
        if (params.timerId !== undefined) {
            this.timerId = params.timerId;
        }
        if (params.lastMoveTime !== undefined) {
            this.lastMoveTime = params.lastMoveTime;
        }
        if (params.gridData !== undefined) {
            this.gridData = params.gridData;
        }
        if (params.difficultySpeeds !== undefined) {
            this.difficultySpeeds = params.difficultySpeeds;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__snake.purgeDependencyOnElmtId(rmElmtId);
        this.__food.purgeDependencyOnElmtId(rmElmtId);
        this.__currentDirection.purgeDependencyOnElmtId(rmElmtId);
        this.__queuedDirection.purgeDependencyOnElmtId(rmElmtId);
        this.__gameOver.purgeDependencyOnElmtId(rmElmtId);
        this.__score.purgeDependencyOnElmtId(rmElmtId);
        this.__paused.purgeDependencyOnElmtId(rmElmtId);
        this.__message.purgeDependencyOnElmtId(rmElmtId);
        this.__difficulty.purgeDependencyOnElmtId(rmElmtId);
        this.__isSelectingDifficulty.purgeDependencyOnElmtId(rmElmtId);
        this.__foodEaten.purgeDependencyOnElmtId(rmElmtId);
        this.__levelComplete.purgeDependencyOnElmtId(rmElmtId);
        this.__maxFoodTarget.purgeDependencyOnElmtId(rmElmtId);
        this.__isMoving.purgeDependencyOnElmtId(rmElmtId);
        this.__gridData.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__snake.aboutToBeDeleted();
        this.__food.aboutToBeDeleted();
        this.__currentDirection.aboutToBeDeleted();
        this.__queuedDirection.aboutToBeDeleted();
        this.__gameOver.aboutToBeDeleted();
        this.__score.aboutToBeDeleted();
        this.__paused.aboutToBeDeleted();
        this.__message.aboutToBeDeleted();
        this.__difficulty.aboutToBeDeleted();
        this.__isSelectingDifficulty.aboutToBeDeleted();
        this.__foodEaten.aboutToBeDeleted();
        this.__levelComplete.aboutToBeDeleted();
        this.__maxFoodTarget.aboutToBeDeleted();
        this.__isMoving.aboutToBeDeleted();
        this.__gridData.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // 游戏配置 - 10×10固定场地
    private gridSize: number; // 10×10的场地
    private cellSize: number; // 每个格子28像素（更大一些）
    // 游戏状态
    private __snake: ObservedPropertyObjectPU<Array<[
        number,
        number
    ]>>; // 初始在中心
    get snake() {
        return this.__snake.get();
    }
    set snake(newValue: Array<[
        number,
        number
    ]>) {
        this.__snake.set(newValue);
    }
    private __food: ObservedPropertyObjectPU<[
        number,
        number
    ]>;
    get food() {
        return this.__food.get();
    }
    set food(newValue: [
        number,
        number
    ]) {
        this.__food.set(newValue);
    }
    private __currentDirection: ObservedPropertySimplePU<string>; // 当前移动方向
    get currentDirection() {
        return this.__currentDirection.get();
    }
    set currentDirection(newValue: string) {
        this.__currentDirection.set(newValue);
    }
    private __queuedDirection: ObservedPropertySimplePU<string>; // 排队的下一个方向
    get queuedDirection() {
        return this.__queuedDirection.get();
    }
    set queuedDirection(newValue: string) {
        this.__queuedDirection.set(newValue);
    }
    private __gameOver: ObservedPropertySimplePU<boolean>;
    get gameOver() {
        return this.__gameOver.get();
    }
    set gameOver(newValue: boolean) {
        this.__gameOver.set(newValue);
    }
    private __score: ObservedPropertySimplePU<number>;
    get score() {
        return this.__score.get();
    }
    set score(newValue: number) {
        this.__score.set(newValue);
    }
    private __paused: ObservedPropertySimplePU<boolean>;
    get paused() {
        return this.__paused.get();
    }
    set paused(newValue: boolean) {
        this.__paused.set(newValue);
    }
    private __message: ObservedPropertySimplePU<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __difficulty: ObservedPropertySimplePU<number>;
    get difficulty() {
        return this.__difficulty.get();
    }
    set difficulty(newValue: number) {
        this.__difficulty.set(newValue);
    }
    private __isSelectingDifficulty: ObservedPropertySimplePU<boolean>;
    get isSelectingDifficulty() {
        return this.__isSelectingDifficulty.get();
    }
    set isSelectingDifficulty(newValue: boolean) {
        this.__isSelectingDifficulty.set(newValue);
    }
    private __foodEaten: ObservedPropertySimplePU<number>;
    get foodEaten() {
        return this.__foodEaten.get();
    }
    set foodEaten(newValue: number) {
        this.__foodEaten.set(newValue);
    }
    private __levelComplete: ObservedPropertySimplePU<boolean>;
    get levelComplete() {
        return this.__levelComplete.get();
    }
    set levelComplete(newValue: boolean) {
        this.__levelComplete.set(newValue);
    }
    private __maxFoodTarget: ObservedPropertySimplePU<number>;
    get maxFoodTarget() {
        return this.__maxFoodTarget.get();
    }
    set maxFoodTarget(newValue: number) {
        this.__maxFoodTarget.set(newValue);
    }
    private __isMoving: ObservedPropertySimplePU<boolean>;
    get isMoving() {
        return this.__isMoving.get();
    }
    set isMoving(newValue: boolean) {
        this.__isMoving.set(newValue);
    }
    // 游戏计时
    private gameSpeed: number;
    private timerId: number;
    private lastMoveTime: number;
    // 存储每个格子的状态
    private __gridData: ObservedPropertyObjectPU<Array<Array<string>>>;
    get gridData() {
        return this.__gridData.get();
    }
    set gridData(newValue: Array<Array<string>>) {
        this.__gridData.set(newValue);
    }
    // 难度配置
    private difficultySpeeds: number[];
    // 生命周期
    aboutToAppear() {
        this.initializeGrid();
    }
    aboutToDisappear() {
        this.stopGame();
    }
    // 初始化网格
    initializeGrid() {
        // 快速初始化10×10空网格
        let newGrid: Array<Array<string>> = [];
        for (let i = 0; i < this.gridSize; i++) {
            newGrid.push(Array(this.gridSize).fill('empty'));
        }
        this.gridData = newGrid;
        // 延迟初始化游戏状态
        setTimeout(() => {
            this.updateGrid();
        }, 50);
    }
    // 停止游戏
    stopGame() {
        if (this.timerId > 0) {
            clearInterval(this.timerId);
            this.timerId = 0;
        }
        this.isMoving = false;
    }
    // 开始游戏
    startGame() {
        this.stopGame();
        // 设置游戏速度
        this.gameSpeed = this.difficultySpeeds[this.difficulty - 1];
        this.maxFoodTarget = this.difficulty <= 5 ? 5 : 10;
        this.lastMoveTime = new Date().getTime();
        // 开始游戏循环（60FPS）
        this.timerId = setInterval(() => {
            this.gameLoop();
        }, 16);
    }
    // 游戏主循环
    gameLoop() {
        if (this.paused || this.gameOver || this.isSelectingDifficulty || this.levelComplete)
            return;
        const currentTime = new Date().getTime();
        const elapsed = currentTime - this.lastMoveTime;
        if (elapsed >= this.gameSpeed && !this.isMoving) {
            this.isMoving = true;
            this.moveSnake();
            this.lastMoveTime = currentTime;
            this.isMoving = false;
        }
    }
    // 移动蛇 - 核心逻辑
    moveSnake() {
        // 在移动前立即应用排队的下一个方向
        this.currentDirection = this.queuedDirection;
        let headX = this.snake[0][0];
        let headY = this.snake[0][1];
        // 计算下一个位置
        switch (this.currentDirection) {
            case 'up':
                headY -= 1;
                break;
            case 'down':
                headY += 1;
                break;
            case 'left':
                headX -= 1;
                break;
            case 'right':
                headX += 1;
                break;
        }
        // 边界检查（10×10场地）
        if (headX < 0 || headX >= this.gridSize || headY < 0 || headY >= this.gridSize) {
            this.endGame();
            return;
        }
        // 碰撞检查
        for (let i = 0; i < this.snake.length; i++) {
            if (this.snake[i][0] === headX && this.snake[i][1] === headY) {
                this.endGame();
                return;
            }
        }
        // 创建新蛇
        let newSnake: Array<[
            number,
            number
        ]> = [[headX, headY]];
        // 检查是否吃到食物
        if (headX === this.food[0] && headY === this.food[1]) {
            // 吃到食物，蛇变长
            for (let i = 0; i < this.snake.length; i++) {
                newSnake.push(this.snake[i]);
            }
            this.score += 10;
            this.foodEaten += 1;
            this.message = `分数: ${this.score} | 难度: ${this.difficulty}级 | 食物: ${this.foodEaten}/${this.maxFoodTarget}`;
            if (this.foodEaten >= this.maxFoodTarget) {
                this.completeLevel();
                return;
            }
            // 生成新食物（只在内部9×9区域）
            this.generateFood(newSnake);
        }
        else {
            // 没吃到食物，正常移动
            for (let i = 0; i < this.snake.length - 1; i++) {
                newSnake.push(this.snake[i]);
            }
        }
        this.snake = newSnake;
        this.updateGrid();
    }
    // 生成食物 - 只在内部9×9区域出现
    generateFood(snake: Array<[
        number,
        number
    ]>) {
        let attempts = 0;
        let found = false;
        let newFood: [
            number,
            number
        ] = [1, 1]; // 默认在内部区域
        while (!found && attempts < 100) {
            // 只在1-8的范围内生成食物（避开最外围的0和9）
            // 这样食物只会出现在内部的9×9区域（坐标1-8）
            newFood = [
                Math.floor(Math.random() * 8) + 1,
                Math.floor(Math.random() * 8) + 1 // 1-8
            ];
            found = true;
            for (let i = 0; i < snake.length; i++) {
                if (snake[i][0] === newFood[0] && snake[i][1] === newFood[1]) {
                    found = false;
                    break;
                }
            }
            attempts++;
        }
        this.food = newFood;
    }
    // 更新网格数据
    updateGrid() {
        let newGrid: Array<Array<string>> = [];
        // 创建10×10网格
        for (let row = 0; row < this.gridSize; row++) {
            let rowData: Array<string> = [];
            for (let col = 0; col < this.gridSize; col++) {
                let cellType = 'empty';
                // 检查是否是食物
                if (col === this.food[0] && row === this.food[1]) {
                    cellType = 'food';
                }
                rowData.push(cellType);
            }
            newGrid.push(rowData);
        }
        // 放置蛇
        for (let i = 0; i < this.snake.length; i++) {
            const segment = this.snake[i];
            const x = segment[0];
            const y = segment[1];
            if (x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize) {
                newGrid[y][x] = i === 0 ? 'snakeHead' : 'snakeBody';
            }
        }
        this.gridData = newGrid;
    }
    // 完成关卡
    completeLevel() {
        this.levelComplete = true;
        this.stopGame();
        this.message = `恭喜！完成第${this.difficulty}级关卡`;
    }
    // 结束游戏
    endGame() {
        this.gameOver = true;
        this.stopGame();
        this.message = '游戏结束';
    }
    // 立即响应方向改变
    changeDirectionImmediate(newDir: string) {
        if (this.isSelectingDifficulty || this.gameOver || this.levelComplete || this.paused) {
            return;
        }
        // 防止直接反向移动
        if ((this.currentDirection === 'up' && newDir === 'down') ||
            (this.currentDirection === 'down' && newDir === 'up') ||
            (this.currentDirection === 'left' && newDir === 'right') ||
            (this.currentDirection === 'right' && newDir === 'left')) {
            return;
        }
        // 立即设置排队的方向
        this.queuedDirection = newDir;
    }
    // 方向按钮点击处理
    handleDirectionButton(direction: string) {
        // 立即改变排队的方向
        this.changeDirectionImmediate(direction);
        // 如果游戏暂停，按方向键就自动继续
        if (this.paused && !this.isSelectingDifficulty && !this.gameOver && !this.levelComplete) {
            this.togglePause();
        }
    }
    // 选择难度并开始游戏
    startWithDifficulty(level: number) {
        this.difficulty = level;
        this.isSelectingDifficulty = false;
        this.gameOver = false;
        this.levelComplete = false;
        this.foodEaten = 0;
        this.score = 0;
        this.currentDirection = 'right';
        this.queuedDirection = 'right';
        this.snake = [[5, 5], [4, 5], [3, 5]];
        // 初始食物也在内部区域
        this.food = [7, 5]; // 确保在内部区域
        this.startGame();
        this.message = `分数: ${this.score} | 难度: ${this.difficulty}级 | 食物: ${this.foodEaten}/${this.maxFoodTarget}`;
    }
    // 返回难度选择
    backToDifficultySelection() {
        this.stopGame();
        this.snake = [[5, 5], [4, 5], [3, 5]];
        this.food = [7, 5]; // 内部区域
        this.currentDirection = 'right';
        this.queuedDirection = 'right';
        this.gameOver = false;
        this.levelComplete = false;
        this.score = 0;
        this.foodEaten = 0;
        this.paused = false;
        this.message = '《玉散江作业》贪吃蛇';
        this.isSelectingDifficulty = true;
        this.updateGrid();
    }
    // 重置游戏
    resetGame() {
        this.stopGame();
        this.snake = [[5, 5], [4, 5], [3, 5]];
        this.food = [7, 5]; // 内部区域
        this.currentDirection = 'right';
        this.queuedDirection = 'right';
        this.gameOver = false;
        this.levelComplete = false;
        this.score = 0;
        this.foodEaten = 0;
        this.paused = false;
        this.isSelectingDifficulty = true;
        this.message = '《玉散江作业》贪吃蛇';
        this.updateGrid();
    }
    // 继续下一关
    nextLevel() {
        this.stopGame();
        if (this.difficulty < 10) {
            this.difficulty += 1;
        }
        this.snake = [[5, 5], [4, 5], [3, 5]];
        this.currentDirection = 'right';
        this.queuedDirection = 'right';
        this.gameOver = false;
        this.levelComplete = false;
        this.foodEaten = 0;
        this.paused = false;
        this.isSelectingDifficulty = false;
        // 生成新食物（在内部区域）
        this.generateFood(this.snake);
        this.startGame();
        this.message = `分数: ${this.score} | 难度: ${this.difficulty}级 | 食物: ${this.foodEaten}/${this.maxFoodTarget}`;
    }
    // 暂停/继续
    togglePause() {
        if (this.isSelectingDifficulty || this.gameOver || this.levelComplete)
            return;
        this.paused = !this.paused;
    }
    // 获取单元格显示内容
    getCellContent(cellType: string): string {
        switch (cellType) {
            case 'snakeHead': return '●';
            case 'snakeBody': return '○';
            case 'food': return '★';
            default: return '·';
        }
    }
    // 获取单元格颜色
    getCellColor(cellType: string): ResourceColor {
        switch (cellType) {
            case 'snakeHead': return Color.Green;
            case 'snakeBody': return Color.Green;
            case 'food': return Color.Red;
            default: return Color.Gray;
        }
    }
    // 获取单元格字体大小
    getCellSize(cellType: string): number {
        switch (cellType) {
            case 'snakeHead': return this.cellSize;
            case 'snakeBody': return this.cellSize - 2;
            case 'food': return this.cellSize;
            default: return this.cellSize - 4;
        }
    }
    // 获取难度描述
    getDifficultyDescription(level: number): string {
        const descriptions = [
            "超慢 - 新手友好 (吃5个)",
            "很慢 - 适合初学者 (吃5个)",
            "慢速 - 轻松上手 (吃5个)",
            "较慢 - 简单难度 (吃5个)",
            "中等 - 标准速度 (吃5个)",
            "较快 - 略有挑战 (吃10个)",
            "快速 - 需要技巧 (吃10个)",
            "很快 - 高手难度 (吃10个)",
            "极快 - 专业玩家 (吃10个)",
            "极限 - 挑战不可能 (吃10个)"
        ];
        return descriptions[level - 1];
    }
    // 获取难度颜色
    getDifficultyColor(level: number): ResourceColor {
        if (level <= 3)
            return Color.Green;
        else if (level <= 6)
            return Color.Blue;
        else if (level <= 8)
            return Color.Orange;
        else
            return Color.Red;
    }
    // 生成难度级别数组
    getDifficultyLevels(): number[] {
        const levels: number[] = [];
        for (let i = 1; i <= 10; i++) {
            levels.push(i);
        }
        return levels;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.height('100%');
            Scroll.scrollable(ScrollDirection.Vertical);
            Scroll.scrollBar(BarState.On);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(20);
            Column.backgroundColor(0xF0F8FF);
            Column.justifyContent(FlexAlign.Start);
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题
            Row.create();
            // 标题
            Row.width('100%');
            // 标题
            Row.padding(10);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.message);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        // 标题
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 游戏状态
            if (this.gameOver) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.justifyContent(FlexAlign.Center);
                        Column.alignItems(HorizontalAlign.Center);
                        Column.margin({ bottom: 20 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('游戏结束!');
                        Text.fontSize(26);
                        Text.fontColor(Color.Red);
                        Text.margin({ bottom: 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`最终分数: ${this.score}`);
                        Text.fontSize(20);
                        Text.margin({ bottom: 20 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('重新选择难度');
                        Button.onClick(() => this.resetGame());
                        Button.backgroundColor(Color.Blue);
                        Button.width(150);
                        Button.height(40);
                        Button.margin({ bottom: 10 });
                    }, Button);
                    Button.pop();
                    Column.pop();
                });
            }
            else if (this.levelComplete) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.justifyContent(FlexAlign.Center);
                        Column.alignItems(HorizontalAlign.Center);
                        Column.margin({ bottom: 20 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('恭喜过关!');
                        Text.fontSize(26);
                        Text.fontColor(Color.Green);
                        Text.margin({ bottom: 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`分数: ${this.score} | 难度: ${this.difficulty}级`);
                        Text.fontSize(20);
                        Text.margin({ bottom: 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`吃了 ${this.foodEaten} 个食物`);
                        Text.fontSize(18);
                        Text.margin({ bottom: 20 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('继续下一关');
                        Button.onClick(() => this.nextLevel());
                        Button.backgroundColor(Color.Green);
                        Button.width(120);
                        Button.height(40);
                        Button.margin({ right: 20 });
                    }, Button);
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('返回菜单');
                        Button.onClick(() => this.backToDifficultySelection());
                        Button.backgroundColor(Color.Blue);
                        Button.width(120);
                        Button.height(40);
                    }, Button);
                    Button.pop();
                    Row.pop();
                    Column.pop();
                });
            }
            else if (this.isSelectingDifficulty) {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 难度选择
                        Column.create();
                        // 难度选择
                        Column.width('100%');
                        // 难度选择
                        Column.padding(20);
                        // 难度选择
                        Column.margin({ bottom: 20 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('请选择游戏难度');
                        Text.fontSize(24);
                        Text.fontWeight(FontWeight.Bold);
                        Text.margin({ bottom: 20 });
                        Text.fontColor(Color.Blue);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('级别越高，蛇移动越快');
                        Text.fontSize(16);
                        Text.fontColor(Color.Gray);
                        Text.margin({ bottom: 30 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const level = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Button.createWithLabel(`${level}级 - ${this.getDifficultyDescription(level)}`);
                                Button.onClick(() => this.startWithDifficulty(level));
                                Button.backgroundColor(this.getDifficultyColor(level));
                                Button.fontColor(Color.White);
                                Button.width('90%');
                                Button.height(45);
                                Button.margin({ bottom: 8 });
                            }, Button);
                            Button.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.getDifficultyLevels(), forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`当前选择: ${this.difficulty}级`);
                        Text.fontSize(16);
                        Text.margin({ top: 20 });
                        Text.fontColor(Color.Green);
                    }, Text);
                    Text.pop();
                    // 难度选择
                    Column.pop();
                });
            }
            else if (this.paused) {
                this.ifElseBranchUpdateFunction(3, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('游戏暂停');
                        Text.fontSize(24);
                        Text.fontColor(Color.Orange);
                        Text.margin({ bottom: 10 });
                        Text.width('100%');
                        Text.textAlign(TextAlign.Center);
                    }, Text);
                    Text.pop();
                });
            }
            // 游戏区域
            else {
                this.ifElseBranchUpdateFunction(4, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 游戏区域
            if (!this.isSelectingDifficulty && !this.gameOver && !this.levelComplete) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 分数和状态
                        Row.create();
                        // 分数和状态
                        Row.width('100%');
                        // 分数和状态
                        Row.margin({ bottom: 5 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`分数: ${this.score}`);
                        Text.fontSize(18);
                        Text.fontColor(Color.Blue);
                        Text.layoutWeight(1);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`难度: ${this.difficulty}级`);
                        Text.fontSize(18);
                        Text.fontColor(this.getDifficultyColor(this.difficulty));
                    }, Text);
                    Text.pop();
                    // 分数和状态
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.margin({ bottom: 10 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`食物: ${this.foodEaten}/${this.maxFoodTarget}`);
                        Text.fontSize(18);
                        Text.fontColor(Color.Red);
                        Text.layoutWeight(1);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`目标: ${this.difficulty <= 5 ? '5个' : '10个'}`);
                        Text.fontSize(18);
                        Text.fontColor(0x800080);
                    }, Text);
                    Text.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 10×10游戏网格
                        Column.create();
                        // 10×10游戏网格
                        Column.border({ width: 2, color: Color.Black });
                        // 10×10游戏网格
                        Column.backgroundColor(Color.White);
                        // 10×10游戏网格
                        Column.padding(5);
                        // 10×10游戏网格
                        Column.margin({ bottom: 20 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const rowData = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                ForEach.create();
                                const forEachItemGenFunction = _item => {
                                    const cellType = _item;
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(this.getCellContent(cellType));
                                        Text.fontSize(this.getCellSize(cellType));
                                        Text.fontColor(this.getCellColor(cellType));
                                        Text.width(this.cellSize);
                                        Text.height(this.cellSize);
                                        Text.textAlign(TextAlign.Center);
                                    }, Text);
                                    Text.pop();
                                };
                                this.forEachUpdateFunction(elmtId, rowData, forEachItemGenFunction);
                            }, ForEach);
                            ForEach.pop();
                            Row.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.gridData, forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    // 10×10游戏网格
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 方向控制
                        Column.create();
                        // 方向控制
                        Column.margin({ bottom: 20 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 上方向键
                        Row.create();
                        // 上方向键
                        Row.justifyContent(FlexAlign.Center);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('↑');
                        Button.onClick(() => this.handleDirectionButton('up'));
                        Button.width(90);
                        Button.height(70);
                        Button.backgroundColor(0x4CAF50);
                        Button.fontColor(Color.White);
                        Button.fontSize(28);
                        Button.margin({ bottom: 5 });
                    }, Button);
                    Button.pop();
                    // 上方向键
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 左、下、右方向键
                        Row.create();
                        // 左、下、右方向键
                        Row.justifyContent(FlexAlign.Center);
                        // 左、下、右方向键
                        Row.margin({ top: 5 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('←');
                        Button.onClick(() => this.handleDirectionButton('left'));
                        Button.width(90);
                        Button.height(70);
                        Button.backgroundColor(0x2196F3);
                        Button.fontColor(Color.White);
                        Button.fontSize(28);
                        Button.margin({ right: 20 });
                    }, Button);
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('↓');
                        Button.onClick(() => this.handleDirectionButton('down'));
                        Button.width(90);
                        Button.height(70);
                        Button.backgroundColor(0xFF9800);
                        Button.fontColor(Color.White);
                        Button.fontSize(28);
                        Button.margin({ right: 20 });
                    }, Button);
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('→');
                        Button.onClick(() => this.handleDirectionButton('right'));
                        Button.width(90);
                        Button.height(70);
                        Button.backgroundColor(0xF44336);
                        Button.fontColor(Color.White);
                        Button.fontSize(28);
                    }, Button);
                    Button.pop();
                    // 左、下、右方向键
                    Row.pop();
                    // 方向控制
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 控制按钮
                        Row.create();
                        // 控制按钮
                        Row.margin({ bottom: 20 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel(this.paused ? '继续' : '暂停');
                        Button.onClick(() => this.togglePause());
                        Button.backgroundColor(this.paused ? Color.Green : Color.Orange);
                        Button.width(100);
                        Button.height(40);
                        Button.margin({ right: 20 });
                    }, Button);
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('返回菜单');
                        Button.onClick(() => this.backToDifficultySelection());
                        Button.backgroundColor(0x800080);
                        Button.fontColor(Color.White);
                        Button.width(120);
                        Button.height(40);
                    }, Button);
                    Button.pop();
                    // 控制按钮
                    Row.pop();
                    Column.pop();
                });
            }
            // 游戏说明
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 游戏说明
            Column.create();
            // 游戏说明
            Column.margin({ top: 10, bottom: 20 });
            // 游戏说明
            Column.padding(10);
            // 游戏说明
            Column.border({ width: 1, color: Color.Gray });
            // 游戏说明
            Column.width('90%');
            // 游戏说明
            Column.alignSelf(ItemAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('游戏说明:');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 5 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('1. 选择难度级别开始游戏');
            Text.fontSize(14);
            Text.fontColor(Color.Gray);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('2. 方向键控制蛇移动（立即响应）');
            Text.fontSize(14);
            Text.fontColor(Color.Gray);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('3. 10×10固定场地，食物只在内圈出现');
            Text.fontSize(14);
            Text.fontColor(Color.Gray);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('4. 前5关吃5个过关，后5关吃10个过关');
            Text.fontSize(14);
            Text.fontColor(Color.Gray);
        }, Text);
        Text.pop();
        // 游戏说明
        Column.pop();
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false" });
