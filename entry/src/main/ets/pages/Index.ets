/*
 * 贪吃蛇游戏 -
 */

@Entry
@Component
struct Index {
  // 游戏状态
  @State snake: Array<[number, number]> = [[5, 10], [4, 10], [3, 10]]
  @State food: [number, number] = [10, 10]
  @State dir: string = 'right'
  @State gameOver: boolean = false
  @State score: number = 0
  @State paused: boolean = false
  @State message: string = '《玉散江作业》贪吃蛇'
  @State difficulty: number = 5 // 默认难度为5（1-10级）
  @State isSelectingDifficulty: boolean = true // 是否正在选择难度
  @State foodEaten: number = 0 // 已吃食物数量
  @State levelComplete: boolean = false // 关卡是否完成
  @State maxFoodTarget: number = 5 // 食物目标数量

  // 游戏配置
  gridSize: number = 15
  cellSize: number = 18
  gameSpeed: number = 300 // 根据难度调整
  timerId: number = 0

  // 存储每个格子的状态
  @State gridData: Array<Array<string>> = []

  // 难度配置：级别越高，速度越快
  difficultySpeeds: number[] = [500, 450, 400, 350, 300, 250, 200, 150, 100, 50]

  // 生命周期
  aboutToAppear() {
    this.updateGrid()
  }

  aboutToDisappear() {
    if (this.timerId > 0) {
      clearInterval(this.timerId)
    }
  }

  // 开始游戏
  startGame() {
    if (this.timerId > 0) {
      clearInterval(this.timerId)
    }

    // 根据难度设置速度
    this.gameSpeed = this.difficultySpeeds[this.difficulty - 1]

    // 设置关卡目标
    this.maxFoodTarget = this.difficulty <= 5 ? 5 : 10

    this.timerId = setInterval(() => {
      if (!this.paused && !this.gameOver && !this.isSelectingDifficulty && !this.levelComplete) {
        this.moveSnake()
      }
    }, this.gameSpeed)
  }

  // 移动蛇
  moveSnake() {
    if (this.gameOver || this.paused || this.isSelectingDifficulty || this.levelComplete) return

    // 获取蛇头
    let headX = this.snake[0][0]
    let headY = this.snake[0][1]

    // 移动方向
    if (this.dir === 'up') headY -= 1
    else if (this.dir === 'down') headY += 1
    else if (this.dir === 'left') headX -= 1
    else if (this.dir === 'right') headX += 1

    // 检查碰撞
    if (headX < 0 || headX >= this.gridSize || headY < 0 || headY >= this.gridSize) {
      this.endGame()
      return
    }

    // 检查是否撞到自己
    for (let i = 0; i < this.snake.length; i++) {
      if (this.snake[i][0] === headX && this.snake[i][1] === headY) {
        this.endGame()
        return
      }
    }

    // 创建新蛇
    let newSnake: Array<[number, number]> = [[headX, headY], ...this.snake]

    // 检查是否吃到食物
    if (headX === this.food[0] && headY === this.food[1]) {
      this.score += 10
      this.foodEaten += 1
      this.message = `分数: ${this.score} | 难度: ${this.difficulty}级 | 食物: ${this.foodEaten}/${this.maxFoodTarget}`

      // 检查是否完成关卡
      if (this.foodEaten >= this.maxFoodTarget) {
        this.completeLevel()
        return
      }

      this.generateFood(newSnake)
    } else {
      newSnake.pop()
    }

    this.snake = newSnake
    this.updateGrid()
  }

  // 生成食物
  generateFood(snake: Array<[number, number]>) {
    let newFood: [number, number] = [7, 7] // 默认值
    let attempts = 0
    let found = false

    while (!found && attempts < 100) {
      newFood = [
        Math.floor(Math.random() * this.gridSize),
        Math.floor(Math.random() * this.gridSize)
      ]

      found = true
      for (let i = 0; i < snake.length; i++) {
        if (snake[i][0] === newFood[0] && snake[i][1] === newFood[1]) {
          found = false
          break
        }
      }

      attempts++
    }

    this.food = newFood
  }

  // 更新网格数据
  updateGrid() {
    let newGrid: Array<Array<string>> = []

    for (let row = 0; row < this.gridSize; row++) {
      let rowData: Array<string> = []
      for (let col = 0; col < this.gridSize; col++) {
        let cellType = 'empty'

        // 检查是否是蛇头
        if (this.snake.length > 0 && this.snake[0][0] === col && this.snake[0][1] === row) {
          cellType = 'snakeHead'
        }
        // 检查是否是蛇身
        else {
          let isSnake = false
          for (let i = 1; i < this.snake.length; i++) {
            if (this.snake[i][0] === col && this.snake[i][1] === row) {
              cellType = 'snakeBody'
              isSnake = true
              break
            }
          }

          // 检查是否是食物
          if (!isSnake && this.food[0] === col && this.food[1] === row) {
            cellType = 'food'
          }
        }

        rowData.push(cellType)
      }
      newGrid.push(rowData)
    }

    this.gridData = newGrid
  }

  // 完成关卡
  completeLevel() {
    this.levelComplete = true
    if (this.timerId > 0) {
      clearInterval(this.timerId)
    }
    this.message = `恭喜！完成第${this.difficulty}级关卡`
    this.updateGrid()
  }

  // 结束游戏
  endGame() {
    this.gameOver = true
    if (this.timerId > 0) {
      clearInterval(this.timerId)
    }
    this.message = '游戏结束'
    this.updateGrid()
  }

  // 改变方向 - 修改为立即响应
  changeDirection(newDir: string) {
    if (this.isSelectingDifficulty || this.gameOver || this.levelComplete) return

    // 允许立即改变方向，不需要等待
    if (this.dir === 'up' && newDir !== 'down') {
      this.dir = newDir
    } else if (this.dir === 'down' && newDir !== 'up') {
      this.dir = newDir
    } else if (this.dir === 'left' && newDir !== 'right') {
      this.dir = newDir
    } else if (this.dir === 'right' && newDir !== 'left') {
      this.dir = newDir
    }
  }

  // 选择难度并开始游戏
  startWithDifficulty(level: number) {
    this.difficulty = level
    this.isSelectingDifficulty = false
    this.gameOver = false
    this.levelComplete = false
    this.foodEaten = 0
    this.score = 0
    this.startGame()
    this.message = `分数: ${this.score} | 难度: ${this.difficulty}级 | 食物: ${this.foodEaten}/${this.maxFoodTarget}`
  }

  // 返回难度选择
  backToDifficultySelection() {
    if (this.timerId > 0) {
      clearInterval(this.timerId)
    }

    this.snake = [[5, 10], [4, 10], [3, 10]]
    this.food = [10, 10]
    this.dir = 'right'
    this.gameOver = false
    this.levelComplete = false
    this.score = 0
    this.foodEaten = 0
    this.paused = false
    this.message = '《玉散江作业》贪吃蛇'
    this.isSelectingDifficulty = true
    this.updateGrid()
  }

  // 重置游戏
  resetGame() {
    if (this.timerId > 0) {
      clearInterval(this.timerId)
    }

    this.snake = [[5, 10], [4, 10], [3, 10]]
    this.food = [10, 10]
    this.dir = 'right'
    this.gameOver = false
    this.levelComplete = false
    this.score = 0
    this.foodEaten = 0
    this.paused = false
    this.isSelectingDifficulty = true
    this.message = '《玉散江作业》贪吃蛇'
    this.updateGrid()
  }

  // 继续下一关
  nextLevel() {
    if (this.difficulty < 10) {
      this.difficulty += 1
    }
    this.snake = [[5, 10], [4, 10], [3, 10]]
    this.food = [10, 10]
    this.dir = 'right'
    this.gameOver = false
    this.levelComplete = false
    this.foodEaten = 0
    this.paused = false
    this.isSelectingDifficulty = false
    this.startGame()
    this.message = `分数: ${this.score} | 难度: ${this.difficulty}级 | 食物: ${this.foodEaten}/${this.maxFoodTarget}`
  }

  // 暂停/继续
  togglePause() {
    if (this.isSelectingDifficulty || this.gameOver || this.levelComplete) return
    this.paused = !this.paused
  }

  // 根据单元格类型获取显示内容
  getCellContent(cellType: string): string {
    switch (cellType) {
      case 'snakeHead': return '●'
      case 'snakeBody': return '○'
      case 'food': return '★'
      default: return '·'
    }
  }

  // 根据单元格类型获取颜色
  getCellColor(cellType: string): ResourceColor {
    switch (cellType) {
      case 'snakeHead': return Color.Green
      case 'snakeBody': return Color.Green
      case 'food': return Color.Red
      default: return Color.Gray
    }
  }

  // 根据单元格类型获取字体大小
  getCellSize(cellType: string): number {
    switch (cellType) {
      case 'snakeHead': return this.cellSize
      case 'snakeBody': return this.cellSize - 2
      case 'food': return this.cellSize
      default: return this.cellSize - 4
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
    ]
    return descriptions[level - 1]
  }

  // 获取难度对应的颜色
  getDifficultyColor(level: number): ResourceColor {
    if (level <= 3) return Color.Green // 简单难度
    else if (level <= 6) return Color.Blue // 中等难度
    else if (level <= 8) return Color.Orange // 困难难度
    else return Color.Red // 极难难度
  }

  // 生成难度级别数组（解决 ForEach 类型问题）
  getDifficultyLevels(): number[] {
    let levels: number[] = []
    for (let i = 1; i <= 10; i++) {
      levels.push(i)
    }
    return levels
  }

  build() {
    Column() {
      // 标题和分数
      Row() {
        Text(this.message)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .layoutWeight(1)
          .textAlign(TextAlign.Center)
      }
      .width('100%')
      .padding(10)

      // 游戏状态
      if (this.gameOver) {
        Column() {
          Text('游戏结束!')
            .fontSize(26)
            .fontColor(Color.Red)
            .margin({ bottom: 10 })

          Text(`最终分数: ${this.score}`)
            .fontSize(20)
            .margin({ bottom: 20 })

          Button('重新选择难度')
            .onClick(() => this.resetGame())
            .backgroundColor(Color.Blue)
            .width(150)
            .height(40)
            .margin({ bottom: 10 })
        }
        .width('100%')
        .justifyContent(FlexAlign.Center)
        .alignItems(HorizontalAlign.Center)
      }
      else if (this.levelComplete) {
        Column() {
          Text('恭喜过关!')
            .fontSize(26)
            .fontColor(Color.Green)
            .margin({ bottom: 10 })

          Text(`分数: ${this.score} | 难度: ${this.difficulty}级`)
            .fontSize(20)
            .margin({ bottom: 10 })

          Text(`吃了 ${this.foodEaten} 个食物`)
            .fontSize(18)
            .margin({ bottom: 20 })

          Row() {
            Button('继续下一关')
              .onClick(() => this.nextLevel())
              .backgroundColor(Color.Green)
              .width(120)
              .height(40)
              .margin({ right: 20 })

            Button('返回菜单')
              .onClick(() => this.backToDifficultySelection())
              .backgroundColor(Color.Blue)
              .width(120)
              .height(40)
          }
        }
        .width('100%')
        .justifyContent(FlexAlign.Center)
        .alignItems(HorizontalAlign.Center)
      }
      else if (this.isSelectingDifficulty) {
        // 难度选择界面
        Column() {
          Text('请选择游戏难度')
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .margin({ bottom: 20 })
            .fontColor(Color.Blue)

          Text('级别越高，蛇移动越快')
            .fontSize(16)
            .fontColor(Color.Gray)
            .margin({ bottom: 30 })

          // 创建10个难度级别按钮 - 使用显式类型声明
          ForEach(this.getDifficultyLevels(), (level: number, index?: number) => {
            Button(`${level}级 - ${this.getDifficultyDescription(level)}`)
              .onClick(() => this.startWithDifficulty(level))
              .backgroundColor(this.getDifficultyColor(level))
              .fontColor(Color.White)
              .width('90%')
              .height(45)
              .margin({ bottom: 8 })
          })

          Text(`当前选择: ${this.difficulty}级`)
            .fontSize(16)
            .margin({ top: 20 })
            .fontColor(Color.Green)
        }
        .width('100%')
        .padding(20)
      }
      else if (this.paused) {
        Text('游戏暂停')
          .fontSize(24)
          .fontColor(Color.Orange)
          .margin({ bottom: 10 })
      }

      // 游戏区域 - 只在游戏进行中显示
      if (!this.isSelectingDifficulty && !this.gameOver && !this.levelComplete) {
        Column() {
          Row() {
            Text(`分数: ${this.score}`)
              .fontSize(18)
              .fontColor(Color.Blue)
              .layoutWeight(1)

            Text(`难度: ${this.difficulty}级`)
              .fontSize(18)
              .fontColor(this.getDifficultyColor(this.difficulty))
          }
          .width('100%')
          .margin({ bottom: 5 })

          Row() {
            Text(`食物: ${this.foodEaten}/${this.maxFoodTarget}`)
              .fontSize(18)
              .fontColor(Color.Red)
              .layoutWeight(1)

            Text(`目标: ${this.difficulty <= 5 ? '5个' : '10个'}`)
              .fontSize(18)
              .fontColor(0x800080) // 紫色，使用十六进制代替 Color.Purple
          }
          .width('100%')
          .margin({ bottom: 10 })

          Column() {
            // 使用显式类型声明
            ForEach(this.gridData, (rowData: string[], rowIndex: number) => {
              Row() {
                ForEach(rowData, (cellType: string, colIndex: number) => {
                  Text(this.getCellContent(cellType))
                    .fontSize(this.getCellSize(cellType))
                    .fontColor(this.getCellColor(cellType))
                })
              }
            })
          }
          .border({ width: 2, color: Color.Black })
          .backgroundColor(Color.White)
          .padding(5)
          .margin({ bottom: 20 })

          // 方向控制 - 修改为更灵敏的按钮
          Column() {
            Row() {
              Button('↑')
                .onClick(() => this.changeDirection('up'))
                .width(70)
                .height(55)
                .margin({ bottom: 5 })
            }
            .justifyContent(FlexAlign.Center)

            Row() {
              Button('←')
                .onClick(() => this.changeDirection('left'))
                .width(70)
                .height(55)
                .margin({ right: 10 })

              Button('↓')
                .onClick(() => this.changeDirection('down'))
                .width(70)
                .height(55)
                .margin({ right: 10 })

              Button('→')
                .onClick(() => this.changeDirection('right'))
                .width(70)
                .height(55)
            }
            .justifyContent(FlexAlign.Center)
            .margin({ top: 5 })
          }
          .margin({ bottom: 20 })

          // 控制按钮
          Row() {
            Button(this.paused ? '继续' : '暂停')
              .onClick(() => this.togglePause())
              .backgroundColor(this.paused ? Color.Green : Color.Orange)
              .width(100)
              .height(40)
              .margin({ right: 20 })

            Button('返回菜单')
              .onClick(() => this.backToDifficultySelection())
              .backgroundColor(0x800080) // 紫色
              .fontColor(Color.White)
              .width(120)
              .height(40)
          }
        }
      }

      // 游戏说明 - 只在难度选择界面显示
      if (this.isSelectingDifficulty || this.gameOver || this.levelComplete) {
        Column() {
          Text('游戏说明:')
            .fontSize(16)
            .fontWeight(FontWeight.Bold)
            .margin({ bottom: 5 })

          Text('1. 选择难度级别开始游戏')
            .fontSize(14)
            .fontColor(Color.Gray)

          Text('2. 方向键控制蛇移动（立即响应）')
            .fontSize(14)
            .fontColor(Color.Gray)

          Text('3. 吃到★增加10分，前5关吃5个过关')
            .fontSize(14)
            .fontColor(Color.Gray)

          Text('4. 后5关吃10个过关，不要撞墙或自己')
            .fontSize(14)
            .fontColor(Color.Gray)
        }
        .margin({ top: 20 })
        .padding(10)
        .border({ width: 1, color: Color.Gray })
        .width('90%')
      }
    }
    .width('100%')
    .height('100%')
    .padding(20)
    .backgroundColor(0xF0F8FF)
    .justifyContent(FlexAlign.Center)
    .alignItems(HorizontalAlign.Center)
  }
}
