import React, { useEffect, useState } from 'react';
import { addNotes, clearDataMsgAfterSavedRecord } from '../redux/slice/AddNewNoteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AlertMessage from './AlertMessage';


function NewNotes() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.addNewNote.isLoading);
  const data = useSelector((state) => state.addNewNote.data);
  const [title, setTitle] = useState("");
  const [description, setDescritpion] = useState("");
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const saveNotes = () => {
    let obj = {
      title,
      description
    }
    if (!status) {
      dispatch(addNotes(obj));
    }
  }

  const handleOnChange = (ev) => {
    let {name} = ev.target;
    // Now we don't need textcontent attribute. if we use desctructuring. So we use name attribute in tag to get correct data.

    if (name === 'title') {
      setTitle(ev.target.value);
    }
    if (name === 'description') {
      setDescritpion(ev.target.value);
    }
  }

 useEffect(() => {
   if (data === "Success") {
     setAlert({ type: 'success', message: 'Data added Successfully!' });
     dispatch(clearDataMsgAfterSavedRecord());  // As I useDispatch and call one function. So why we add here behind the logic explanation is in Home.jsx page.
     navigate('/');
    } else if (data) {
      setAlert({ type: 'danger', message: 'Something went wrong..' });
      dispatch(clearDataMsgAfterSavedRecord());
    }
  }, [data]);


  return (
    <div className='col-md-6 offset-md-3 my-3'>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="title" className="form-control" id="title" aria-describedby="title" name="title" onChange={handleOnChange} value={title} />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea className="form-control" id="description" rows="3" name='description' onChange={handleOnChange} value={description}></textarea>
      </div>
      <button className="btn btn-primary" onClick={saveNotes}>Save</button>
      <Link className="btn btn-primary ms-2" to="/">Back to Notes</Link>
      <div>
        {alert && <AlertMessage alert={alert.type} message={alert.message} />}
      </div>
    </div>
  )
}

export default NewNotes;

// Notes :-
// why we use -> useEffect() because alertMessage function calls sucessfully but using the alertMessage function inside JSX won't execute and render the alert component properly.
//  As we know useEffect calls when component to be render. Or also it is call with another way as we know useEffect calls with dependency array.
/*
   So, here we give state variable because when data state changes it will runs. Because useEffect somethings needs to call so it depends on dependancy array.
   that's why we give statevariable so when it will change(means when statevariable get data) that inside code will runs it means what data we need to set.
   By this we set the our data  with the key interms of object.
   we set data in form of object because its easy to set multiple values in object form  that's why as below we set the variables in the object form.
 */
