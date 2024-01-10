import { useState } from "react";
import { Button,  Checkbox,  CloseButton, ListItem, OrderedList,
         HStack,Stack, Text, Textarea, } from "@chakra-ui/react"
import { useAddTodoMutation,useGetTodosQuery } from '../features/todoSlice';

function TodoList(){

  const {data:todos = []} = useGetTodosQuery({limit:15})
  const [addTodo] = useAddTodoMutation()
  const [textInput,setTextInput] = useState('');


    const handleAddTodo =  async () => {
      if(textInput.trim() !== ""){   
          await addTodo({title:textInput,completed:false});
          setTextInput('')
      }
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
        ></CloseButton>
        <Checkbox
        _checked={{
       
        }}
        color="red"
        fontSize="2rem"
        isChecked={todo.completed}
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