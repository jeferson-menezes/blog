export interface PostagemForm {

    titulo: string
    metaTitulo: string
    slug: string
    sumario: string
    publicado: boolean
    conteudo: string
    autorId: number
    categoriasId: number[],
    tagsId: number[],
    parentId: number

}