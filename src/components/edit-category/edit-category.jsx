import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Button, Input } from "@material-tailwind/react";
import axiosService from "../../axios";
import Loader from "../loader/Loader";
import { toast } from "react-toastify";

const EditCategory = () => {
  const { categoryId } = useParams();
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState(null);
  const [newImage, setNewImage] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [loader, setLoader] = useState(false);

  const {
    data: category,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories", categoryId],
    queryFn: async () => {
      const response = await axiosService.get(`/category/${categoryId}`);
      return response.data;
    },
  });

  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
      setNewImage(category.image);
    }
  }, [category]);

  const mutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("name", categoryName);

      console.log(categoryName, selectedFile);

      const res = await axiosService.patch(
        `/category/${categoryId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      toast.success("Category updated successfully.");
    },
    onError: () => {
      toast.error("Failed to update the category.");
    },
  });

  const handleImageChanges = (event) => {
    if (event.target.files && event.target.files[0]) {
      setNewImage(URL.createObjectURL(event.target.files[0]));
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    mutation.mutate();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-md mx-auto">
      {(isLoading || mutation.isPending) && <Loader />}
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h4 className="text-xl font-bold text-center text-slate-600 mb-4">
          Edit Category
        </h4>
        <div className="mb-4">
          <Input
            value={categoryName}
            label="Category name"
            name="name"
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Input
            type="file"
            accept="image/*"
            label="Choose another image"
            name="image"
            onChange={handleImageChanges}
          />
          <div className="flex justify-between">
            {selectedFile && (
              <span>
                Selected image:{" "}
                <img
                  className="h-14 mt-2 rounded-lg object-cover object-center"
                  src={newImage}
                  alt="alt"
                />{" "}
              </span>
            )}
            <span>
              {selectedFile ? "Prev " : "Current "} Image:
              <img
                className="h-14 mt-2 rounded-lg object-cover object-center"
                src={category.image}
                alt={category.name}
              />
            </span>
          </div>
        </div>
        <div className="text-end">
          <Button color="blue-gray" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
