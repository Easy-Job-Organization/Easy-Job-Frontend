"use client"

import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useRegister } from '@/hooks/auth/useRegister'
import { uploadFile } from '@/firebase/config'
import { City } from '@/interfaces/city'
import { Service } from '@/interfaces/service'
import { Language } from '@/interfaces/language'
import { Speciality } from '@/interfaces/speciality'
import { authService } from '@/services'

function Register() {

    const [name, setName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone_number, setPhone] = useState("")
    const [photo, setPhoto] = useState<File | null>(null)
    const [photo_url,setPhotoUrl]= useState("")
    const [password, setPassword] = useState("")
    const [selectedOption, setSelectedOption] = useState('')
    const [serviceId, setServiceId] = useState('')
    const [cityId, setCityId] = useState('')
    const [languageId, setLanguageId] = useState('')
    const [specialityId, SetSpecialityId] = useState('')
    const [services, setServices] = useState<Service[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [language, setLanguage] = useState<Language[]>([]);
    const [speciality,SetSpeciality] = useState<Speciality[]>([])
    const router = useRouter();
    const { register } = useRegister()

    useEffect(()=>{
        const fetchData = async () =>{
            const services = await authService.getServices();
            setServices(services);
      
            const language = await authService.getLanguage();
            setLanguage(language)

            const city = await authService.getCity();
            setCities(city)

            const speciality = await authService.getSpeciality();
            SetSpeciality(speciality);
            console.log(language)
            console.log(services)
            console.log(city)
            console.log(speciality)
        }
        
        fetchData();
        
    },[])

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setPhoto(event.target.files[0]);
            const url = await uploadFile(event.target.files[0]).then((url)=>setPhotoUrl(url))
            //console.log(photo_url)
        }
    };

    const onSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if (!name || !last_name || !email || !phone_number || !password || !selectedOption) {
            alert("All fields are required");
        } else {
            if(photo!== null){
                if(selectedOption == 'Prof' && (!serviceId || !cityId || !languageId || !specialityId)){
                    alert("all fields are required")
                }else if(selectedOption == 'Cli'){
                    await register(name, last_name, email, phone_number, password, photo_url, "", "", "", "",  selectedOption)
                    .then(() => router.push("/login"))
                    .catch((e: Error) => alert(e));
                }
                else{
                    console.log("Estos son los ids" + serviceId +'\n'+ languageId + '\n' + cityId + '\n' + specialityId)
                    await register(name, last_name, email, phone_number, password, photo_url, serviceId, languageId, cityId, specialityId,  selectedOption)
                    .then(() => router.push("/login"))
                    .catch((e: Error) => alert(e));
                }
              
            }else{
                if(selectedOption == 'Prof' && (!serviceId || !cityId || !languageId || !specialityId)){
                    alert("all fields are required")
                }else if(selectedOption == 'Cli'){
                    await register(name, last_name, email, phone_number, password, photo_url, "", "", "", "",  selectedOption)
                    .then(() => router.push("/login"))
                    .catch((e: Error) => alert(e));
                }
                else{
                    await register(name, last_name, email, phone_number, password, "", serviceId, languageId, cityId, specialityId,  selectedOption)
                .then(() => router.push("/login"))
                .catch((e: Error) => alert(e));
                }
              
            }
            
        }
    }

    return (
        // <body className="bg-cream text-charcoal">
        //     <main className="flex-1 md:p-0 lg:pt-8 lg:px-8 md:ml-24 flex flex-col">
                
        //     </main>
        // </body>
        <section className=" p-4 shadow-md bg-white rounded-lg ">
            <div className="md:flex">
                <h2 className="md:w-1/3 tracking-wide font-bold mb-6 ml-2 text-2xl">Crea tu perfil</h2>
            </div>
            <form>
                <div className="md:flex mb-8">
                    <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                        <div className="mb-4">
                            <label className="block tracking-wide text-md font-semibold">Nombre</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} className=" bg-gray-100 w-full shadow-inner p-4 border-0" type="text" name="name" placeholder="Pepito"></input>
                        </div>
                        <div className="md:flex mb-4">
                            <div className="md:flex-1 md:pr-3">
                                <label className="block tracking-wide text-charcoal-darker text-md font-semibold">Apellido</label>
                                <input value={last_name} onChange={(e) => setLastName(e.target.value)} className="bg-gray-100 w-full shadow-inner p-4 border-0" type="text" name="last_name" placeholder="Perez"></input>
                            </div>
                            <div className="md:flex-1 md:pl-3">
                                <label className="block tracking-wide text-charcoal-darker text-md font-semibold">Email</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-100 w-full shadow-inner p-4 border-0" type="text" name="email" placeholder="pepitoperez@example.com"></input>
                            </div>
                        </div>
                        <div className="md:flex mb-4">
                            <div className="md:flex-1 md:pr-3">
                                <label className="block tracking-wide text-charcoal-darker text-md font-semibold">Telefono Celular</label>
                                <input value={phone_number} onChange={(e) => setPhone(e.target.value)} className="bg-gray-100 w-full shadow-inner p-4 border-0" type="tel" name="tel" placeholder="+57 3181234567"></input>
                            </div>
                            <div className="md:flex-1 md:pl-3">
                                <label className="block tracking-wide text-charcoal-darker text-md font-semibold">Foto</label>
                                <input onChange={handleFileChange} className="bg-gray-100 w-full shadow-inner p-4 border-0" type="file" name="photo" placeholder="-99.1405168"></input>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block tracking-wide text-md font-semibold">Constraseña</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-100 w-full shadow-inner p-4 border-0" type="password" name="pass" placeholder="****"></input>
                        </div>
                        <div className="md:flex mb-4 items-center justify-center">
                            <label htmlFor="user" className="block mb-2 text-sm font-medium w-40 ">Rol del usuario</label>
                            <select id="countries" className="border text-sm rounded-lg p-4 w-full shadow-inner bg-gray-100" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                                <option value="">Elige tu rol</option>
                                <option value="Prof">Professional</option>
                                <option value="Cli">Client</option>
                            </select>
                        </div>
                        {selectedOption === "Prof" && (
                                <>
                                    <div className="md:flex mb-4">
                                        <label htmlFor="service" className="block mb-2 text-sm font-medium w-40">Elije un servicio</label>
                                        <select
                                            id="services"
                                            className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            value={serviceId}
                                            onChange={(e) => setServiceId(e.target.value)}
                                        >
                                            <option value=""></option>
                                            {services.map(service => (
                                                <option key={service.id} value={service.id}>
                                                    {service.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="md:flex mb-4">
                                        <label htmlFor="language" className="block mb-2 text-sm font-medium w-40">Elige un idioma</label>
                                        <select
                                            id="languages"
                                            className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            value={languageId}
                                            onChange={(e) => setLanguageId(e.target.value)}
                                        >
                                            <option value=""></option>
                                            {language.map(language => (
                                                <option key={language.id} value={language.id}>
                                                    {language.language_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="md:flex mb-4">
                                        <label htmlFor="city" className="block mb-2 text-sm font-medium w-40">Elige una ciudad</label>
                                        <select
                                            id="cities"
                                            className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            value={cityId}
                                            onChange={(e) => setCityId(e.target.value)}
                                        >
                                            <option value=""></option>
                                            {cities.map(city => (
                                                <option key={city.id} value={city.id}>
                                                    {city.city_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="md:flex mb-4">
                                        <label htmlFor="speciality" className="block mb-2 text-sm font-medium w-40">Elige una especialidad </label>
                                        <select
                                            id="specialities"
                                            className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            value={specialityId}
                                            onChange={(e) => SetSpecialityId(e.target.value)}
                                        >
                                            <option value=""></option>
                                            {speciality.map(speciality => (
                                                <option key={speciality.id} value={speciality.id}>
                                                    {speciality.speciality_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            )}
                             <button type="submit" className="w-full mt-3 text-cream-lighter bg-brick bg-blue-500 text-white font-semibold p-3 rounded-md" onClick={onSubmit}>
                                Crear perfil
                            </button>
                            
                    </div>
                </div>
            </form>
        </section>
    )
}

export default Register;
