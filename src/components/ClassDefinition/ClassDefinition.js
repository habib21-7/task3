import React, { useState } from "react";
import { Input,Button} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { useSelector,useDispatch } from 'react-redux';
import { setClassDefintion } from './classSlice';

const ClassDefinition = () => {
  
  const classSlice = useSelector((state) => state.classSlice);
  const dispatch = useDispatch();
  const [newClass, setNewClass] = useState("");


  const handleAddClass = () => {
    dispatch(setClassDefintion(newClass));
    setNewClass("");
  }


  return (
    <div>
      <div>
        <h2>Classes List</h2>
        <ul style={{ listStyle: "none", padding: 0 ,fontSize:"20px"}}>
          {/* {classSlice.map((classInfo) => ( */}
            <li key={classSlice.id+1} style={{ display: 'flex', margin: '10px' }}>
             {/* <span><strong>{classInfo.id}</strong></span>
              <span>.</span> */}
              <span><strong>{classSlice.name}</strong> </span>
            </li>
          {/* // ))} */}
        </ul>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          placeholder="Enter a new class"
          value={newClass}
          onChange={(value) => setNewClass(value)}
          style={{ width: "20%" }}
        />
        <Button onClick={handleAddClass}>Add</Button>
      </div>
    </div>
  );

}

export default ClassDefinition;
