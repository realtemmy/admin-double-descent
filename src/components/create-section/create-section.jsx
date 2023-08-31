import "./create-section.scss";

const CreateSection = () => {
  const handleSectionSubmit = (e) =>{
    e.preventDefault();
    return;
  }

//   console.log(process.env.REACT_APP_SERVER_HOST);

  return (
    <div className="create-section-container">
      <div className="container">
        <form className="form" onSubmit={handleSectionSubmit}>
          <div>
            <label htmlFor="name">Section name</label>
            <input type="text" name="name" id="name" />
          </div>
          <div className="my-2">
            <label htmlFor="categories">Choose category</label>
            <select name="categories" >
                <option defaultValue="">Categories</option>
                <option value="1">Provisions</option>
                <option value="2">Cosmetics</option>
                <option value="kids">Kids</option>
            </select>
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateSection;
