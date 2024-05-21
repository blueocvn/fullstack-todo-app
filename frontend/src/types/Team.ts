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
    leader_id: string
    leader_name: string
}

export interface CreateTeamModel {
    name: string
}
