import { Candidacies } from "~/client";
import type { Route } from "./+types/candidacies";
import { Form, Link } from "react-router";
import { userContext } from "~/context";

export async function clientLoader({ context }: Route.ClientLoaderArgs) {
  const currentUser = context.get(userContext);

  if (currentUser?.municipality) {
    const { data, error } = await Candidacies.candidaciesGetCandidacies({
      query: { municipality: currentUser.municipality },
    });
    return data;
  }
  return null;
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const municipality = formData.get("municipality") as string;

  const { data, error } = await Candidacies.candidaciesGetCandidacies({
    query: { municipality: Number(municipality) },
  });
  return data;
}

export default function CreateCandidacy({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const candidacies = loaderData || actionData;

  return (
    <>
      {!loaderData && (
        <Form method="post">
          <label htmlFor="municipality">Municipio </label>
          <select name="municipality" id="municipality" className="border-2">
            <option value="1"> Acatic</option>
            <option value="2"> Acatlán de Juárez</option>
            <option value="3"> Ahualulco de Mercado</option>
            <option value="4"> Amacueca</option>
            <option value="5"> Amatitán</option>
            <option value="6"> Ameca</option>
            <option value="7"> San Juanito de Escobedo</option>
            <option value="8"> Arandas</option>
            <option value="9"> El Arenal</option>
            <option value="10"> Atemajac de Brizuela</option>
            <option value="11"> Atengo</option>
            <option value="12"> Atenguillo</option>
            <option value="13"> Atotonilco el Alto</option>
            <option value="14"> Atoyac</option>
            <option value="15"> Autlán de Navarro</option>
            <option value="16"> Ayotlán</option>
            <option value="17"> Ayutla</option>
            <option value="18"> La Barca</option>
            <option value="19"> Bolaños</option>
            <option value="20"> Cabo Corrientes</option>
            <option value="21"> Casimiro Castillo</option>
            <option value="22"> Cihuatlán</option>
            <option value="23"> Zapotlán el Grande</option>
            <option value="24"> Cocula</option>
            <option value="25"> Colotlán</option>
            <option value="26"> Concepción de Buenos Aires</option>
            <option value="27"> Cuautitlán de García Barragán</option>
            <option value="28"> Cuautla</option>
            <option value="29"> Cuquío</option>
            <option value="30"> Chapala</option>
            <option value="31"> Chimaltitán</option>
            <option value="32"> Chiquilistlán</option>
            <option value="33"> Degollado</option>
            <option value="34"> Ejutla</option>
            <option value="35"> Encarnación de Díaz</option>
            <option value="36"> Etzatlán</option>
            <option value="37"> El Grullo</option>
            <option value="38"> Guachinango</option>
            <option value="39"> Guadalajara</option>
            <option value="40"> Hostotipaquillo</option>
            <option value="41"> Huejúcar</option>
            <option value="42"> Huejuquilla el Alto</option>
            <option value="43"> La Huerta</option>
            <option value="44"> Ixtlahuacán de los Membrillos</option>
            <option value="45"> Ixtlahuacán del Río</option>
            <option value="46"> Jalostotitlán</option>
            <option value="47"> Jamay</option>
            <option value="48"> Jesús María</option>
            <option value="49"> Jilotlán de los Dolores</option>
            <option value="50"> Jocotepec</option>
            <option value="51"> Juanacatlán</option>
            <option value="52"> Juchitlán</option>
            <option value="53"> Lagos de Moreno</option>
            <option value="54"> El Limón</option>
            <option value="55"> Magdalena</option>
            <option value="56"> Santa María del Oro</option>
            <option value="57"> La Manzanilla de</option>
            <option value="58"> Mascota</option>
            <option value="59"> Mazamitla</option>
            <option value="60"> Mexticacán</option>
            <option value="61"> Mezquitic</option>
            <option value="62"> Mixtlán</option>
            <option value="63"> Ocotlán</option>
            <option value="64"> Ojuelos de Jalisco</option>
            <option value="65"> Pihuamo</option>
            <option value="66"> Poncitlán</option>
            <option value="67"> Puerto Vallarta</option>
            <option value="68"> Villa Purificación</option>
            <option value="69"> Quitupan</option>
            <option value="70"> El Salto</option>
            <option value="71"> San Cristóbal de la Barranca</option>
            <option value="72"> San Diego de Alejandría</option>
            <option value="73"> San Juan de los Lagos</option>
            <option value="74"> San Julián</option>
            <option value="75"> San Marcos</option>
            <option value="76"> San Martín de Bolaños</option>
            <option value="77"> San Martín Hidalgo</option>
            <option value="78"> San Miguel el Alto</option>
            <option value="79"> Gómez Farías</option>
            <option value="80"> San Sebastián del Oeste</option>
            <option value="81"> Santa María de los Ángeles</option>
            <option value="82"> Sayula</option>
            <option value="83"> Tala</option>
            <option value="84"> Talpa de Allende</option>
            <option value="85"> Tamazula de Gordiano</option>
            <option value="86"> Tapalpa</option>
            <option value="87"> Tecalitlán</option>
            <option value="88"> Techaluta de Montenegro</option>
            <option value="89"> Tecolotlán</option>
            <option value="90"> Tenamaxtlán</option>
            <option value="91"> Teocaltiche</option>
            <option value="92"> Teocuitatlán de Corona</option>
            <option value="93"> Tepatitlán de Morelos</option>
            <option value="94"> Tequila</option>
            <option value="95"> Teuchitlán</option>
            <option value="96"> Tizapán el Alto</option>
            <option value="97"> Tlajomulco de Zúñiga</option>
            <option value="98"> San Pedro Tlaquepaque</option>
            <option value="99"> Tolimán</option>
            <option value="100"> Tomatlán</option>
            <option value="101"> Tonalá</option>
            <option value="102"> Tonaya</option>
            <option value="103"> Tonila</option>
            <option value="104"> Totatiche</option>
            <option value="105"> Tototlán</option>
            <option value="106"> Tuxcacuesco</option>
            <option value="107"> Tuxcueca</option>
            <option value="108"> Tuxpan</option>
            <option value="109"> Unión de San Antonio</option>
            <option value="110"> Unión de Tula</option>
            <option value="111"> Valle de Guadalupe</option>
            <option value="112"> Valle de Juárez</option>
            <option value="113"> San Gabriel</option>
            <option value="114"> Villa Corona</option>
            <option value="115"> Villa Guerrero</option>
            <option value="116"> Villa Hidalgo</option>
            <option value="117"> Cañadas de Obregón</option>
            <option value="118"> Yahualica de González Gallo</option>
            <option value="119"> Zacoalco de Torres</option>
            <option value="120"> Zapopan</option>
            <option value="121"> Zapotiltic</option>
            <option value="122"> Zapotitlán de Vadillo</option>
            <option value="123"> Zapotlán del Rey</option>
            <option value="124"> Zapotlanejo</option>
            <option value="125"> San Ignacio Cerro Gordo</option>
          </select>
          <button
            type="submit"
            className="bg-black text-white rounded-md p-1 ml-2"
          >
            Buscar
          </button>
        </Form>
      )}

      {candidacies ? (
        <>
          <h1 className="text-center font-bold">Registros de municipio</h1>
          <ol className="*:border-3 *:rounded-2xl *:p-2 *:mb-2">
            {candidacies.map((candidacy) => (
              <li key={candidacy.id}>
                <p>{candidacy.political_position}</p>
                <p>posicion: {candidacy.position}</p>
                <Link
                  to={{ pathname: `/candidacy/${candidacy.id}` }}
                  className="text-blue-700 underline"
                >
                  mostrar más...
                </Link>
              </li>
            ))}
            <Link to="/create-candidacy">crear nueva +</Link>
          </ol>
        </>
      ) : (
        <p>Selecciona un municipio</p>
      )}
    </>
  );
}
