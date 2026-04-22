export interface Note{
    title: string,
    content: string,
    tag: NoteTag
    id: string,
    createdAt: string,
    updatedAt: string,
}

export interface NewNote{
    title: string,
    content?: string,
    tag: NoteTag,
}


export type NoteTag = 'Work' | 'Personal' | 'Todo' | 'Shopping' | 'Meeting'