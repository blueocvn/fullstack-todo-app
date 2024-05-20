export interface TeamTaskModel {
    id: string
    title: string
    status: string
    leader: string
    assignee: string
}

export interface TeamModel {
    id: string
    name: string
    leader: string
}

export interface CreateTeamModel {
    name: string
}
