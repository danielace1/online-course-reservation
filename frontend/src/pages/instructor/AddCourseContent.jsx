import { useForm } from "react-hook-form";
import { useCourseStore } from "../../store/useCourseStore";
import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { motion } from "framer-motion";
import FormInput from "../../components/FormInput";
import toast from "react-hot-toast";
import { useParams } from "react-router";

const AddCourseContent = () => {
  const { courseId } = useParams(); // ✅ correct
  const { addCourseContent, isLoading, error } = useCourseStore();

  const [file, setFile] = useState(null);
  const [previewName, setPreviewName] = useState("");

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      type: "video",
      order: 1,
      isFreePreview: false,
    },
  });

  /* ---------- convert file to base64 ---------- */
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  /* ---------- file handler ---------- */
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreviewName(selected.name);
  };

  /* ---------- submit ---------- */
  const onSubmit = async (data) => {
    if (!courseId) {
      toast.error("Invalid course");
      return;
    }

    if (!file) {
      toast.error("Please upload a file");
      return;
    }

    const base64File = await convertToBase64(file);

    const payload = {
      ...data,
      courseId,
      contentFile: base64File,
    };

    const res = await addCourseContent(payload);

    if (res.success) {
      toast.success("Content added successfully 🎉");
      reset();
      setFile(null);
      setPreviewName("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Add Course Content
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Upload lecture video, pdf, quiz or resource.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* TITLE */}
          <FormInput
            label="Lecture Title"
            variant="light"
            required
            {...register("title")}
          />

          {/* TYPE */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Content Type
            </label>

            <select
              {...register("type")}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 outline-none"
            >
              <option value="video">Video</option>
              <option value="pdf">PDF</option>
              <option value="quiz">Quiz</option>
              <option value="link">External Link</option>
            </select>
          </div>

          {/* FILE UPLOAD */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">
              Upload File
            </label>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-purple-500 transition bg-gray-50">
              <UploadCloud size={30} className="text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">
                Click to upload video / pdf / resource
              </span>

              <input type="file" hidden onChange={handleFileChange} />
            </label>

            {previewName && (
              <p className="text-sm text-green-600 mt-2">{previewName}</p>
            )}
          </div>

          {/* ORDER */}
          <FormInput
            label="Lecture Order"
            type="number"
            variant="light"
            {...register("order")}
          />

          {/* QUIZ FIELDS */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormInput
              label="Max Marks"
              type="number"
              variant="light"
              {...register("maxMarks")}
            />

            <FormInput
              label="Weightage (%)"
              type="number"
              variant="light"
              {...register("weightage")}
            />
          </div>

          {/* FREE PREVIEW */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register("isFreePreview")}
              className="w-4 h-4 accent-purple-600"
            />
            <span className="text-gray-600 text-sm">Allow free preview</span>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            disabled={isLoading}
            className="w-full py-3 rounded-xl text-white font-semibold
            bg-gradient-to-r from-purple-600 to-indigo-600"
          >
            {isLoading ? "Uploading..." : "Add Content"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddCourseContent;
