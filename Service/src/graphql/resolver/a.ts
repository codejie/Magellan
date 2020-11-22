import book from "./book";

export default {
    Query: {
        a: () => "b",
        book: () => {
            return {
                name: "book"
            }
        }
    }
}