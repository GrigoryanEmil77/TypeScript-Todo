import { useState } from "react";
import { Button,  Checkbox,  CloseButton, ListItem, OrderedList, HStack,Stack, Text, Textarea, } from "@chakra-ui/react"

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
    
    const Todos: Todo[] = [

    {id: 1, text: "TypeScript", completed: false},
   
]


function TodoList(){

    const [todos,setTodos] = useState(Todos);
    const [textInput,setTextInput] = useState('');

    //console.log(todos)

    const addTodo = () =>{
        if(textInput.trim()){
            const newTodo: Todo = {
                id:todos.length+1,
                text:textInput,
                completed:false          
            }
            setTodos([...todos,newTodo])
            setTextInput('')
        }
    }
    const deleteTodo =(id:number) =>{
        setTodos(todos.filter((todo)=>todo.id !== id))

    }

    const completedTodo = (id:number)  => {
        setTodos(todos.map((todo)=>
            todo.id === id ? {...todo, completed: !todo.completed } : todo
        ))
    }
    return(
        
    <Stack  spacing={10} textAlign="center">
              <Text fontSize='3rem' color="teal">TO-DO LIST</Text>
              <HStack style={{display:"flex",justifyContent:"center",gap:"2rem"}}>
              <Textarea isInvalid placeholder ='TO-DO LIST'  typeof="text"
              value={textInput} 
              onChange={(e)=>
                setTextInput(e.target.value)
              }    width={400} height={40} borderRadius={20} fontSize={30}
        
        />
        <Button color='whiteSmoke' fontSize='2.2rem' borderRadius={20} background='teal'
           onClick={addTodo}> 
           Add Todo
  </Button>

</HStack>
   <OrderedList>{todos.map((todo)=>{
     return(
        <HStack key={todo.id} style={{display:"flex",justifyContent:"center"}}>
        <ListItem style = {{ textDecoration: todo.completed ? 'line-through' : 'none',fontSize:"2.5rem" }} >{todo.text}</ListItem>
        <CloseButton  color='whiteSmoke' background='teal' fontSize="2rem"  onClick={() => deleteTodo(todo.id)}></CloseButton>
        <Checkbox
       _checked={{
       
       }}
      color="red"
      fontSize="2rem"
      isChecked={todo.completed}
      onChange={()=>completedTodo(todo.id)}
    >
      <Text color='blue'>Checked</Text>
    </Checkbox>
        </HStack>
    )
  })}
</OrderedList>
   </Stack>
    )
}
export default TodoList