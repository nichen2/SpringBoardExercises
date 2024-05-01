import { useState } from 'react'

function NewBoxForm({addBox}) {

  const INITIAL_STATE = {
    width: "",
    height: "",
    color: ""
  }
  const [formData, setFormData] = useState(INITIAL_STATE)
  
  const handleChange = e => {
    const { name, value} = e.target;
    setFormData(data => ({
        ...data,
        [name]: value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault();
    addBox({
        width: formData.width,
        height: formData.height,
        backgroundColor: formData.color,
    });
    setFormData(INITIAL_STATE);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='width'>Width</label>
        <input
            id="width"
            type="text"
            name="width"
            placeholder="width"
            value={formData.width}
            onChange={handleChange}
        />
        <label htmlFor='height'>Height</label>
        <input
            id="height"
            type="text"
            name="height"
            placeholder="height"
            value={formData.height}
            onChange={handleChange}
        />
        <label htmlFor='color'>Background Color</label>
        <input
            id="color"
            type="text"
            name="color"
            placeholder="color"
            value={formData.color}
            onChange={handleChange}
        />
        <button>Add New Box</button>
      </form>
    </>
  )
}

export default NewBoxForm
