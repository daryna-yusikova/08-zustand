import axios from "axios"
import type { NewNote, Note } from "../types/note";
import { Category } from "@/types/category";


const perPage = 12;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

axios.defaults.headers.common.Authorization=`Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`

interface NoteSearch{
    notes: Note[],
    totalPages: number
}




export async function fetchNotes (searchQuery: string, pageNumber:number, tag?:string):Promise<NoteSearch>{
    const   params= {
            page:  pageNumber ,
            search: searchQuery,
            perPage: perPage,
            tag: tag,
        }
    const { data } = await axios.get<NoteSearch>('/notes', { params });
    console.log("CATEGORY SENT:", tag);
   return data
}


export async function createNote(newNoteContent: NewNote) {
    const {data} = await axios.post<Note>('/notes',newNoteContent);
    return data
}


export async function deleteNote(noteToDeleteId: Note['id']) {
    const { data } = await axios.delete<Note>(`/notes/${noteToDeleteId}`);
    return data
}

export async function fetchNoteById(id: Note['id']) {
    const { data } = await axios.get<Note>(`/notes/${id}`);
    return data
    
}

