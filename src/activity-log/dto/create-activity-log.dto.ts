
export class CreateActivityLogDto  {
    readonly name: string;
    readonly description: string;
    readonly priority: string;
    readonly deadline: Date;
    readonly listId: number;
}
