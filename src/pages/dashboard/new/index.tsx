import { Container } from "../../../components/container";
import { DashboardHeader } from "../../../components/panelheader";
import { FiUpload, FiTrash } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { v4 as uuidV4 } from "uuid";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../../services/firebaseConnection";

interface ImageItemProps {
  uid: string;
  url: string;
  name: string;
  previewUrl: string;
}

export function New() {
  const [carImages, setCarImages] = useState<ImageItemProps[]>([]);
  const schema = z.object({
    name: z.string().nonempty("Nome é obrigatório"),
    model: z.string().nonempty("Modelo é obrigatório"),
    year: z.string().nonempty("Ano é obrigatório"),
    km: z.string().nonempty("Quilometragem é obrigatória"),
    price: z.string().nonempty("Preço é obrigatório"),
    city: z.string().nonempty("Cidade é obrigatória"),
    whatsapp: z
      .string()
      .min(1, "Telefone é obrigatório")
      .refine((value) => /^(\d{11,12})$/.test(value), {
        message: "Telefone inválido",
      }),
    description: z.string().nonempty("Descrição é obrigatória"),
  });

  type FormData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { user } = useContext(AuthContext);

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "image/jpeg" || file.type === "image/png") {
        await handleUpload(file);
      } else {
        alert("Formato de imagem inválido. Aceitamos apenas JPEG e PNG.");
        return;
      }
    }
  }

  async function handleUpload(file: File) {
    if (!user?.uid) {
      return;
    }
    const currentUid = user?.uid;
    const fileName = uuidV4();

    const storageRef = ref(storage, `images/${currentUid}/${fileName}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        const imageItem = {
          uid: currentUid,
          url: downloadURL,
          name: fileName,
          previewUrl: URL.createObjectURL(file),
        };
        setCarImages((images) => [...images, imageItem]);
      });
    });
  }

  async function onSubmit(data: FormData) {
    console.log(data);
    // Aqui você pode fazer a lógica para enviar os dados para o servidor ou fazer o que precisar com eles
    reset(); // Limpa os campos após o envio
  }

  async function handleDeleteImage(item: ImageItemProps) {
    const imagePath = `images/${item.uid}/${item.name}`;
    const storageRef = ref(storage, imagePath);
    try {
      await deleteObject(storageRef);
      setCarImages(carImages.filter((image) => image.url !== item.url));
    } catch (error) {
      console.log(error + " erro ao deletar imagem");
    }
  }

  return (
    <Container>
      <DashboardHeader />

      <div className="w-full bg-white p-3 flex flex-col rounded-lg sm:flex-row items-center gap-2">
        <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="#000" />
          </div>
          <div className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="opacity-0 cursor-pointer"
              onChange={handleFile}
            />
          </div>
        </button>

        {carImages.map((item) => (
          <div
            key={item.name}
            className="w-full h-32 flex items-center justify-center relative"
          >
            <button
              className="absolute cursor-pointer"
              onClick={() => handleDeleteImage(item)}
            >
              <FiTrash size={28} color="#FFF" />
            </button>
            <img
              src={item.previewUrl}
              alt="Foto do carro"
              className="rounded-lg w-full h-32 object-cover"
            />
          </div>
        ))}
      </div>

      <div className="w-full bg-white p-3 flex flex-col rounded-lg sm:flex-row items-center gap-2 mt-2">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <p className="mb-2 font-medium">Nome do carro</p>
            <Input
              type="text"
              placeholder="Ex: BMW X1 2022"
              register={register}
              name="name"
              error={errors.name?.message}
            />
          </div>

          <div className="mb-3">
            <p className="mb-2 font-medium">Modelo do carro</p>
            <Input
              type="text"
              placeholder="Ex: 1.0 Turbo Flex Automático"
              register={register}
              name="model"
              error={errors.model?.message}
            />
          </div>

          <div className="flex w-full mb-3 flex-rol items-center gap-4">
            <div className="w-full">
              <p className="mb-2 font-medium">Ano do carro</p>
              <Input
                type="text"
                placeholder="Ex: 2022/2023"
                register={register}
                name="year"
                error={errors.year?.message}
              />
            </div>

            <div className="w-full">
              <p className="mb-2 font-medium">KM rodados</p>
              <Input
                type="text"
                placeholder="Ex: 10.000"
                register={register}
                name="km"
                error={errors.km?.message}
              />
            </div>
          </div>

          <div className="flex w-full mb-3 flex-rol items-center gap-4">
            <div className="w-full">
              <p className="mb-2 font-medium">Telefone/Whatsapp para contato</p>
              <Input
                type="text"
                placeholder="Ex: 011999999999"
                register={register}
                name="whatsapp"
                error={errors.whatsapp?.message}
              />
            </div>

            <div className="w-full">
              <p className="mb-2 font-medium">Cidade</p>
              <Input
                type="text"
                placeholder="Ex: São Paulo"
                register={register}
                name="city"
                error={errors.city?.message}
              />
            </div>
          </div>

          <div className="w-full">
            <p className="mb-2 font-medium">Preço(R$)</p>
            <Input
              type="text"
              placeholder="Ex: 60.000"
              register={register}
              name="price"
              error={errors.price?.message}
            />
          </div>

          <div className="w-full">
            <p className="mb-2 font-medium">Descrição</p>
            <textarea
              className="border-2 w-full rounded-md h-24 px-2"
              {...register("description")}
              id="description"
              placeholder="Ex: Carro em ótimo estado, com todas as revisões feitas."
            />
            {errors.description?.message && (
              <p className="text-red-500 mb-1">{errors.description.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-900 text-white font-medium h-10"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </Container>
  );
}
