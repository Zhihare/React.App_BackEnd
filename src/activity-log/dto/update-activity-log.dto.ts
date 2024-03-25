
export class UpdateActivityLogDto  {
    readonly name: string;
    readonly description: string;
    readonly priority: string;
    readonly deadline: Date;
    readonly listId: number;
}