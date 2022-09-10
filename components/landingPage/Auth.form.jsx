import { useState } from "react";

const AuthForm = ({ data }) => {
  const [formData, setFormData] = useState(
    data.fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    setFormData(
      data.fields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
      }, {})
    );
  };

  return (
    <div className="w-1/3 space-y-4">
      <h4>{data.title}</h4>
      <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
        {data.fields.map((field, index) => {
          return (
            <div className="flex flex-col space-y-2" key={index}>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                required
                autoFocus={index === 0}
                type={field.type}
                name={field.name}
                id={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
              />
            </div>
          );
        })}
        <button className="bg-black text-white py-2 rounded-md" type="submit">
          {data.button}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
