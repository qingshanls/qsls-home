/** 游戏状态键名 */
export const GAME_STATUS_KEYS = {
  GENSHIN: 'homepage.status.genshin',
  STARRAIL: 'homepage.status.starrail',
  ZZZ: 'homepage.status.zzz',
  ARKNIGHTS: 'homepage.status.arknights',
} as const

/** 游戏状态默认值 */
export const DEFAULT_GAME_STATUS: Record<string, string> = {
  [GAME_STATUS_KEYS.GENSHIN]: '摆烂',
  [GAME_STATUS_KEYS.STARRAIL]: '摆烂',
  [GAME_STATUS_KEYS.ZZZ]: '摆烂',
  [GAME_STATUS_KEYS.ARKNIGHTS]: '长草',
}

/** 背景图片 URL */
export const BACKGROUND_IMAGE = 'https://image.qingshanls.icu/file/1744958267474_00006.jpg'

/** 远程状态 API 地址（留空则使用本地默认值） */
export const STATUS_API_URL = ''