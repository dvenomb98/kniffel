import { initialScore } from "@/config/game/config"

export enum PlayerTurn {
    PLAYER_ONE = "PLAYER_ONE",
    PLAYER_TWO = "PLAYER_TWO"
}

export type PossibleValue = number | "canceled"

export type PossibleScore = typeof initialScore


export type UpperLayerKeys = "one_er" | "two_er" | "three_er" | "for_er" | "five_er" | "six_er" 
export type BottomLayerKeys = "dreier_pasch" | "vierer_pasch" | "kleine" | "grobe" | "full_house" | "kniffel" | "chance"
export type ScoreKeys = UpperLayerKeys | BottomLayerKeys;
export type Layer = "upper_layer" | "bottom_layer"


export interface UpperLayer {
    one_er: PossibleValue
    two_er: PossibleValue
    three_er: PossibleValue
    for_er: PossibleValue
    five_er: PossibleValue
    six_er: PossibleValue
}

export interface BottomLayer {
    dreier_pasch: PossibleValue
    vierer_pasch: PossibleValue
    kleine: PossibleValue
    grobe: PossibleValue
    full_house: PossibleValue
    kniffel: PossibleValue
    chance: PossibleValue
}

export interface GameStats {
    upper_layer: UpperLayer
    bottom_layer: BottomLayer
}

export interface Player {
    name: string
    order: PlayerTurn
    stats: GameStats
    final_score: number
}


export interface Die {
    value: number
    id: string
    isHeld: boolean
}

export interface GameType {
    boardValues: Die[]
    player_one: Player,
    player_two: Player,
    playerTurn: PlayerTurn,
    rollsLeft: number
    possibleScores: PossibleScore
}