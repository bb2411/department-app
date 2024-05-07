export interface Faculty {
    subjects:String[]
    batches:any[]
    students:student[]
}
export interface student{
    name:String
    id:number
    fathernumber:number
    semid:number
    division:String
}