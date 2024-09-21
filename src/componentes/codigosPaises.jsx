const codigosPaises = [
    { nombre: "Afganistán", código: "+93" },
    { nombre: "Albania", código: "+355" },
    { nombre: "Alemania", código: "+49" },
    { nombre: "Andorra", código: "+376" },
    { nombre: "Angola", código: "+244" },
    { nombre: "Antigua y Barbuda", código: "+1-268" },
    { nombre: "Arabia Saudita", código: "+966" },
    { nombre: "Argelia", código: "+213" },
    { nombre: "Argentina", código: "+54" },
    { nombre: "Armenia", código: "+374" },
    { nombre: "Australia", código: "+61" },
    { nombre: "Austria", código: "+43" },
    { nombre: "Azerbaiyán", código: "+994" },
    { nombre: "Bahamas", código: "+1-242" },
    { nombre: "Bangladesh", código: "+880" },
    { nombre: "Barbados", código: "+1-246" },
    { nombre: "Baréin", código: "+973" },
    { nombre: "Bélgica", código: "+32" },
    { nombre: "Belice", código: "+501" },
    { nombre: "Benín", código: "+229" },
    { nombre: "Bielorrusia", código: "+375" },
    { nombre: "Bolivia", código: "+591" },
    { nombre: "Bosnia y Herzegovina", código: "+387" },
    { nombre: "Botsuana", código: "+267" },
    { nombre: "Brasil", código: "+55" },
    { nombre: "Brunéi", código: "+673" },
    { nombre: "Bulgaria", código: "+359" },
    { nombre: "Burkina Faso", código: "+226" },
    { nombre: "Burundi", código: "+257" },
    { nombre: "Cabo Verde", código: "+238" },
    { nombre: "Camboya", código: "+855" },
    { nombre: "Camerún", código: "+237" },
    { nombre: "Canadá", código: "+1" },
    { nombre: "Catar", código: "+974" },
    { nombre: "Chad", código: "+235" },
    { nombre: "Chile", código: "+56" },
    { nombre: "China", código: "+86" },
    { nombre: "Chipre", código: "+357" },
    { nombre: "Colombia", código: "+57" },
    { nombre: "Comoras", código: "+269" },
    { nombre: "Corea del Norte", código: "+850" },
    { nombre: "Corea del Sur", código: "+82" },
    { nombre: "Costa de Marfil", código: "+225" },
    { nombre: "Costa Rica", código: "+506" },
    { nombre: "Croacia", código: "+385" },
    { nombre: "Cuba", código: "+53" },
    { nombre: "Dinamarca", código: "+45" },
    { nombre: "Ecuador", código: "+593" },
    { nombre: "Egipto", código: "+20" },
    { nombre: "El Salvador", código: "+503" },
    { nombre: "Emiratos Árabes Unidos", código: "+971" },
    { nombre: "Eritrea", código: "+291" },
    { nombre: "Eslovaquia", código: "+421" },
    { nombre: "Eslovenia", código: "+386" },
    { nombre: "España", código: "+34" },
    { nombre: "Estados Unidos", código: "+1" },
    { nombre: "Estonia", código: "+372" },
    { nombre: "Etiopía", código: "+251" },
    { nombre: "Filipinas", código: "+63" },
    { nombre: "Finlandia", código: "+358" },
    { nombre: "Francia", código: "+33" },
    { nombre: "Gabón", código: "+241" },
    { nombre: "Gambia", código: "+220" },
    { nombre: "Georgia", código: "+995" },
    { nombre: "Ghana", código: "+233" },
    { nombre: "Grecia", código: "+30" },
    { nombre: "Guatemala", código: "+502" },
    { nombre: "Guinea", código: "+224" },
    { nombre: "Guinea-Bisáu", código: "+245" },
    { nombre: "Guyana", código: "+592" },
    { nombre: "Haití", código: "+509" },
    { nombre: "Honduras", código: "+504" },
    { nombre: "Hungría", código: "+36" },
    { nombre: "India", código: "+91" },
    { nombre: "Indonesia", código: "+62" },
    { nombre: "Irak", código: "+964" },
    { nombre: "Irán", código: "+98" },
    { nombre: "Irlanda", código: "+353" },
    { nombre: "Islandia", código: "+354" },
    { nombre: "Israel", código: "+972" },
    { nombre: "Italia", código: "+39" },
    { nombre: "Jamaica", código: "+1-876" },
    { nombre: "Japón", código: "+81" },
    { nombre: "Jordania", código: "+962" },
    { nombre: "Kazajistán", código: "+7" },
    { nombre: "Kenia", código: "+254" },
    { nombre: "Kirguistán", código: "+996" },
    { nombre: "Kuwait", código: "+965" },
    { nombre: "Letonia", código: "+371" },
    { nombre: "Líbano", código: "+961" },
    { nombre: "Liberia", código: "+231" },
    { nombre: "Libia", código: "+218" },
    { nombre: "Liechtenstein", código: "+423" },
    { nombre: "Lituania", código: "+370" },
    { nombre: "Luxemburgo", código: "+352" },
    { nombre: "Madagascar", código: "+261" },
    { nombre: "Malasia", código: "+60" },
    { nombre: "Malaui", código: "+265" },
    { nombre: "Maldivas", código: "+960" },
    { nombre: "Malí", código: "+223" },
    { nombre: "Malta", código: "+356" },
    { nombre: "Marruecos", código: "+212" },
    { nombre: "Mauritania", código: "+222" },
    { nombre: "México", código: "+52" },
    { nombre: "Moldavia", código: "+373" },
    { nombre: "Mónaco", código: "+377" },
    { nombre: "Mongolia", código: "+976" },
    { nombre: "Mozambique", código: "+258" },
    { nombre: "Namibia", código: "+264" },
    { nombre: "Nepal", código: "+977" },
    { nombre: "Nicaragua", código: "+505" },
    { nombre: "Níger", código: "+227" },
    { nombre: "Nigeria", código: "+234" },
    { nombre: "Noruega", código: "+47" },
    { nombre: "Nueva Zelanda", código: "+64" },
    { nombre: "Omán", código: "+968" },
    { nombre: "Países Bajos", código: "+31" },
    { nombre: "Pakistán", código: "+92" },
    { nombre: "Panamá", código: "+507" },
    { nombre: "Papúa Nueva Guinea", código: "+675" },
    { nombre: "Paraguay", código: "+595" },
    { nombre: "Perú", código: "+51" },
    { nombre: "Polonia", código: "+48" },
    { nombre: "Portugal", código: "+351" },
    { nombre: "Reino Unido", código: "+44" },
    { nombre: "República Checa", código: "+420" },
    { nombre: "República Dominicana", código: "+1-809" },
    { nombre: "Rusia", código: "+7" },
    { nombre: "Ruanda", código: "+250" },
    { nombre: "Senegal", código: "+221" },
    { nombre: "Serbia", código: "+381" },
  ];

  export default codigosPaises;