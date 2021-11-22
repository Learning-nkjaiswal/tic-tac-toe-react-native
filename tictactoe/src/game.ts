type CellValue = Player | ".";
type Player = "X" | "O";

export default class Game {
    public gameFinished: boolean = false;
    private winnerPlayer: Player | undefined;


    private static myInstance = new Game();
    public static getInstance() {
        return this.myInstance;
    }
    public static reset() {
        this.myInstance = new Game();
    }
    public updateState(newState: string): void {
        if(newState.length !== 9) {
            return;
        }
        for(var i=0; i<9; i++) {
            this.gameStateCell[i] = this.getCellValue(newState.charAt(i));
        }
        this.verifyGame();
    }

    private getCellValue(str: string): CellValue {
        switch(str) {
            case 'X':
            case 'x':
                return "X";
            case "O":
            case "o":
                return "O";
            default:
                return ".";
        }
    }
    /**
     * gameStateCell[N]
     * 0 | 1 | 2
     * --+---+--
     * 3 | 4 | 5
     * --+---+--
     * 6 | 7 | 8
     */
    private gameStateCell: CellValue[];

    private currentPlayer: Player;

    constructor(state: string = ".........") {
        this.gameFinished = false;
        this.currentPlayer = "X";
        this.gameStateCell = state.split('') as any;
        this.verifyGame();
    }

    public getWinner(): Player | undefined {
        return this.winnerPlayer;
    }

    public getGameState(): CellValue[] {
        return this.gameStateCell;
    }

    public markCell(cell: number): boolean {
        if (this.gameFinished) {
            return false;
        }
        if (this.gameStateCell[cell] !== ".") {
            return false;
        }
        if (cell < 0 || cell > 8) {
            return false;
        }
        this.gameStateCell[cell] = this.currentPlayer;
        if(this.verifyGame()) {
            return true;
        }
        this.nextPlayer();
        return false;
    }

    private nextPlayer(): void {
        if (this.currentPlayer === "X") {
            this.currentPlayer = "O";
        } else {
            this.currentPlayer = "X";
        }
    }

    private verifyGame(): boolean {
        // check all 3 row first
        if(this.verifyGameCell(0,1,2)) {
            this.gameFinished = true;
            this.winnerPlayer = this.gameStateCell[0] as any;
            return true;
        }

        if(this.verifyGameCell(3,4,5)) {
            this.gameFinished = true;
            this.winnerPlayer = this.gameStateCell[3] as any;
            return true;
        }

        if(this.verifyGameCell(6,7,8)) {
            this.gameFinished = true;
            this.winnerPlayer = this.gameStateCell[6] as any;
            return true;
        }

        // check all 3 column
        if(this.verifyGameCell(0,3,6)) {
            this.gameFinished = true;
            this.winnerPlayer = this.gameStateCell[0] as any;
            return true;
        }

        if(this.verifyGameCell(1,4,7)) {
            this.gameFinished = true;
            this.winnerPlayer = this.gameStateCell[1] as any;
            return true;
        }

        if(this.verifyGameCell(2,5,8)) {
            this.gameFinished = true;
            this.winnerPlayer = this.gameStateCell[2] as any;
            return true;
        }

        //check both diagonal
        if(this.verifyGameCell(0,4,8)) {
            this.gameFinished = true;
            this.winnerPlayer = this.gameStateCell[0] as any;
            return true;
        }

        if(this.verifyGameCell(2,4,6)) {
            this.gameFinished = true;
            this.winnerPlayer = this.gameStateCell[2] as any;
            return true;
        }

        if(this.checkIfAllCellAreFilled()) {
            this.gameFinished = true;
            return true;
        }
        return false;
    }

    private checkIfAllCellAreFilled(): boolean {
        return this.gameStateCell[0] !== "." 
            && this.gameStateCell[1] !== "."
            && this.gameStateCell[2] !== "."
            && this.gameStateCell[3] !== "."
            && this.gameStateCell[4] !== "."
            && this.gameStateCell[5] !== "."
            && this.gameStateCell[6] !== "."
            && this.gameStateCell[7] !== "."
            && this.gameStateCell[8] !== ".";
    }

    private verifyGameCell(cell1: number, cell2: number, cell3: number): boolean {
        if (this.gameStateCell[cell1] === this.gameStateCell[cell2] 
            && this.gameStateCell[cell1] === this.gameStateCell[cell3] 
            && this.gameStateCell[cell1] !== "."
        ) {
            return true;
        }
        return false;
    }
}

/**
const game = new Game();
game.markCell(0);
console.log(game.getGameState());
game.markCell(0);
console.log(game.getGameState());
game.markCell(1);
console.log(game.getGameState());
game.markCell(2);
console.log(game.getGameState());
game.markCell(4);
console.log(game.getGameState());
game.markCell(3);
console.log(game.getGameState());
game.markCell(7);
console.log(game.getGameState());
console.log(game.getWinner());
game.markCell(6);
console.log(game.getGameState());
*/