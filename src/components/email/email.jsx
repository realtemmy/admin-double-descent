import React, { useState } from "react";
import { Button, Input, Option, Select } from "@material-tailwind/react";

import EditorComponent from "../editor/editor";

const EmailComponent = () => {
  const [message, setMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(message);
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_HOST}/help/send-mail`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("admin-token"),
        },
        body: JSON.stringify({
          html: message,
          title: "Testing multiple emailing system",
        }),
      }
    );
    console.log(await res.json());
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="text-center text-3xl my-5">Compose email </h2>
        <div className="mb-4">
          <Input label="Search by name or email" />
        </div>
        <div className="mb-4">
          <Select name="category" label="Choose User">
            <Option>Temiloluwa</Option>
          </Select>
        </div>

        <EditorComponent handler={(html) => setMessage(html)} />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default EmailComponent;
