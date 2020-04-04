export class Paginacao {

    constructor(
        private size: number,
        private page: number,
        private total: number,
        private totalPages: number,
        private content: any[]
    ) { }
}