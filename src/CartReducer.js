

const initState = {
    products: [
        {
            id:1, 
            title:"C++ course", 
            price: 35, 
            description: "Try out our original course in C++ and impress your interviewers.",
            features: [
                "Full algorithms course in C++",
                "Pointers Cheat Sheet",
                "Memory Management Tips"
            ]
        },
        {
            id:2, 
            title:"Java course", 
            price: 25, 
            description: "Try out our updated course in Java and impress your interviewers.",
            features: [
                "Full algorithms course in Java",
                "OODP Cheat Sheet",
                "Design Convention Tips"
            ]
        },
        {
            id:3, 
            title:"Python course", 
            price: 95, 
            description: "Try out our newest course in Python and impress your interviewers.",
            features: [
                "Full algorithms course in Python",
                "Data Structures Cheat Sheet",
                "List comprehension Tips"
            ]
        },
    ],
    addedItems:[],
    total: 0
}
export default function CartReducer(state = initState, action) {
    return state;
}