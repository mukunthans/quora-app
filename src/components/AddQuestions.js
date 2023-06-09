import {useState ,useContext} from 'react'
import { useSelector } from 'react-redux';
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';
import api from "../api/question&ans";
import './styles/addQuestion.css';
import DataContext from "../context/DataContext";


const AddQuestions = () => {
    const {qAa,setqAa} = useContext(DataContext);
/*     const qAa = useSelector((state) => state.qAa.qAa); */
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();
  const [question,setQuestion] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      const id = qAa.length ? qAa[qAa.length - 1].id + 1 : 1;
      const datetime = format(new Date(), "MMMM dd yyyy pp");
      const newQuestion = {
        id,
        question,
        datetime,
        askedBy: user.email,
        profilePic: user.photo || "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg",
        answers:[]
      };
      try {
        const response = await api.post('/questions', newQuestion);
        const allqAa = [...qAa,response.data];
        setqAa(allqAa);
        setQuestion("");
        navigate("/");
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }; 

  return (
    <div className="AddQuestion">
      <h2>Add Question</h2>
      <form className="addQuestionForm" onSubmit={handleSubmit}>
        <label htmlFor="question">Question:</label>
        <input
          id="question"
          type="text"
          value={question}
          required
          onChange={(e) => setQuestion(e.target.value)}
          placeholder='Enter your question here'
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddQuestions