import { useEffect, useState } from "react";
import { Button,  Checkbox,  CloseButton, ListItem, OrderedList,
     HStack,Stack, Text, Textarea, } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import { fetchTodo, addTodo,completedTodo, deleteTodo} from '../features/todoSlice';
import { RootState} from "../App/store";


function TodoList(){

    const dispatch  = useDispatch();
    const todos = useSelector((state: RootState) => state.todo.todos)
    const [textInput,setTextInput] = useState('');

    useEffect(() => {
      dispatch(fetchTodo(10) as any); 
    }, [dispatch]);
  
    const handleAddTodo = () => {
      if(textInput.trim() !== ""){
          dispatch(addTodo(textInput.trim()));
          setTextInput('')
      }
    };
  
    const handleCompletedTodo = (id: number) => {
      dispatch(completedTodo(id));
    };
  
    const handleDeleteTodo = (id: number) => {
      dispatch(deleteTodo(id));
    };

   
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
           onClick={handleAddTodo}> 
           Add Todo
  </Button>

</HStack>
   <OrderedList>{todos.map((todo)=>{
     return(
        <HStack key={todo.id} style={{display:"flex",justifyContent:"center"}}>
        <ListItem style = {{ textDecoration: todo.completed ? 'line-through' : 'none',fontSize:"2.5rem" }} >
          {todo.title}</ListItem>
        <CloseButton  color='whiteSmoke' background='teal' fontSize="2rem" 
         onClick={() => handleDeleteTodo(todo.id)}></CloseButton>
        <Checkbox
        _checked={{
       
        }}
        color="red"
        fontSize="2rem"
        isChecked={todo.completed}
        onChange={() => handleCompletedTodo(todo.id)}
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