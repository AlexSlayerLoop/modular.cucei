import { Form } from "react-router";
import type { Route } from "./+types/create-candidacy";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
}

export default function CreateCandidacy({}: Route.ClientLoaderArgs) {
  return (
    <>
      <Form
        method="post"
        encType="multipart/form-data"
        className="max-w-5xl mx-auto p-4 bg-white shadow-md rounded space-y-4"
      >
        <div>
          <input name="files" type="file" multiple className="border-2" />
          <input type="submit" value={"Upload Files"} className="border-2" />
        </div>
        <div>
          <input name="files" type="file" multiple className="border-2" />
          <input type="submit" value={"Upload Files"} className="border-2" />
        </div>
        <div>
          <input name="files" type="file" multiple className="border-2" />
          <input type="submit" value={"Upload Files"} className="border-2" />
        </div>
        <div>
          <input name="files" type="file" multiple className="border-2" />
          <input type="submit" value={"Upload Files"} className="border-2" />
        </div>
        <div>
          <input name="files" type="file" multiple className="border-2" />
          <input type="submit" value={"Upload Files"} className="border-2" />
        </div>
        <div>
          <input name="files" type="file" multiple className="border-2" />
          <input type="submit" value={"Upload Files"} className="border-2" />
        </div>
        <div>
          <input name="files" type="file" multiple className="border-2" />
          <input type="submit" value={"Upload Files"} className="border-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="border-2" htmlFor="">
            full_name
          </label>
          <input className="border-2" type="text" />
          <label className="border-2" htmlFor="">
            birthdate
          </label>
          <input className="border-2" type="text" />
          <label className="border-2" htmlFor="">
            gender
          </label>
          <input className="border-2" type="text" />
          <label className="border-2" htmlFor="">
            state_of_residence
          </label>
          <input className="border-2" type="text" />
          <label className="border-2" htmlFor="">
            municipality_of_residence
          </label>
          <input className="border-2" type="text" />
          <label className="border-2" htmlFor="">
            curp
          </label>
          <input className="border-2" type="text" />
          <label className="border-2" htmlFor="">
            ine_valid_until
          </label>
          <input className="border-2" type="text" />
          <label className="border-2" htmlFor="">
            ine_clave_elector
          </label>
          <input className="border-2" type="text" />
          <label className="border-2" htmlFor="">
            is_public_servant
          </label>
          <input className="border-2" type="text" />
          <label className="border-2" htmlFor="">
            ocupation
          </label>
          <input className="border-2" type="text" />
        </div>
      </Form>
    </>
  );
}
