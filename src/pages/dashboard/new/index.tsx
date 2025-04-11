import { Container } from "../../../components/container";
import { DashboardHeader } from "../../../components/panelheader";
import { FiUpload } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function New() {
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

  async function onSubmit(data: FormData) {
    console.log(data);
    // Aqui você pode fazer a lógica para enviar os dados para o servidor ou fazer o que precisar com eles
    reset(); // Limpa os campos após o envio
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
            />
          </div>
        </button>
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
              <p className="mb-2 font-medium">
                Telefone/Whatsapp para contato
              </p>
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
