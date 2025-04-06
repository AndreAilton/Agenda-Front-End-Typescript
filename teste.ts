import { getUserCategorys, deleteUserCategory } from "./src/services/userServices";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhbmRyZWFpbHRvbjJAZ21haWwuY29tIiwiaWF0IjoxNzQzOTAyNDY5LCJleHAiOjE3NDY0OTQ0Njl9.x02lGox8l8TgJG8nAMi0MI2roF_qR_80Fw9cbAv6KIM"
getUserCategorys(token).then((response) => {
  console.log(response);
})

deleteUserCategory(token, 34).then(() => {
  console.log("Categoria deletada com sucesso!");
}).catch((error) => {
  console.error("Erro ao deletar categoria:", error.message);
} )