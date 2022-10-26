declare global {
  class Achievements {
    static has_completed_set: (skill: string, difficulty: string) => boolean
  }
}

export {}