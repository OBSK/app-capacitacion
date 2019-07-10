const state = {
    instituciones: ['Universidad César Vallejo', 'Universidad Nacional', 'UCP', 'UNI', 'UPEU', 'Otros'],
    ciudadList: ['Tarapoto', 'Moyobamba', 'Juanjui', 'Bellavista', 'Chiclayo', 'Lima', 'Otros'],
    microRed: ['OTROS', 'CHAZUTA', 'HUIMBAYOC', 'SAUCE', 'PAPAPLAYA', 'BANDA DE SHILCAYO', 'TARAPOTO', 'MORALES', 'JUAN GUERRA'],
    profesionesList: ['Ingeniería de Sistemas', 'Ingeniería', 'Derecho', 'Economía', 'Ingeniería Civil', 'Agronomía', 'Otros'],
    profesion: ['MEDICO GENERAL', 'MEDICO NEUMOLOGO', 'MEDICO CARDIOLOGO', 'MEDICO NEUROLOGO', 'MEDICO GASTROENTEROLOGO', 'MEDICO DERMATOLOGO', 'MEDICO NEFROLOGO', 'MEDICO ONCOLOGO', 'MEDICO PSIQUIATRA', 'MEDICO CIRUJANO GENERAL', 'MEDICO TRAUMATOLOGO ORTOPEDISTA', 'MEDICO OTORRINOLARINGOLOGO', 'MEDICO OFTALMOLOGO', 'MEDICO UROLOGO', 'MEDICO CIRUJANO ONCOLOGO', 'MEDICO PATOLOGO', 'MEDICO OTROS CIRUGIA', 'MEDICO PEDIATRA', 'MEDICO GINECO-OBSTETRA', 'MEDICO EPIDEMIOLOGO', 'MEDICO RADIOLOGO', 'MEDICO OTRAS ESPECIALIDADES', 'OBSTETRIZ', 'NUTRICIONISTA', 'ODONTOLOGO', 'QUIMICO FARMACEUTICO', 'RADIOTERAPEUTA', 'PSICOLOGO', 'ENFERMERA (O)', 'TECNOLOGO MEDICO', 'BIOLOGO', 'VETERINARIO', 'ASISTENTA SOCIAL', 'TECNICOS DE SALUD', 'TECNICAS DE ENFERMERIA', 'TECNICO DE LABORATORIO', 'TECNICO RADIOLOGO', 'TECNICO DENTAL', 'TECNICO SANEAMIENTO AMBIENTAL', 'AUXILIARES DE SALUD', 'OTROS TECNICOS Y AUXILIARES', 'OTROS NO ESPECIFICADOS', 'INTERNO DE MEDICINA', 'INTERNOS NO MEDICOS', 'SERUMISTA MEDICO', 'SERUMISTA ENFERMERA', 'SERUMISTA ODONTOLOGO', 'SERUMISTA OBSTETRIZ', 'SERUMISTA SERVICIO SOCIAL', 'SERUMISTA PSICOLOGO', 'MEDICO RESIDENTE', 'AGENTE COMUNITARIO', 'ESTADISTICO'],
    establecimiento: [
        { descripcion: 'AGUANO MUYUNA', codDep: '22', codProv: '09', codDist: '04' },
        { descripcion: 'ASUNCION', codDep: '22', codProv: '09', codDist: '11' },
        { descripcion: 'ATUMPAMPA', codDep: '22', codProv: '09', codDist: '01' },
        { descripcion: 'BELLO HORIZONTE', codDep: '22', codProv: '09', codDist: '09' },
        { descripcion: 'CACATACHI', codDep: '22', codProv: '09', codDist: '09' },
        { descripcion: 'CALLANAYACU', codDep: '22', codProv: '09', codDist: '03' },
        { descripcion: 'CHAZUTA', codDep: '22', codProv: '09', codDist: '04' },
        { descripcion: 'CURIYACU', codDep: '22', codProv: '09', codDist: '01' },
        { descripcion: 'BANDA SHILCAYO', codDep: '22', codProv: '09', codDist: '09' },
        { descripcion: 'DOS DE MAYO', codDep: '22', codProv: '09', codDist: '13' },
        { descripcion: 'HOSPITAL RURAL DE PAPAPLAYA', codDep: '22', codProv: '09', codDist: '11' },
        { descripcion: 'HUAYCO TARAPOTO', codDep: '22', codProv: '09', codDist: '01' },
        { descripcion: 'HUIMBAYOC', codDep: '22', codProv: '09', codDist: '07' },
        { descripcion: 'JUAN GUERRA', codDep: '22', codProv: '09', codDist: '08' },
        { descripcion: 'LA UNION (SANIRARCA)', codDep: '22', codProv: '09', codDist: '09' },
        { descripcion: 'LAS PALMAS', codDep: '22', codProv: '09', codDist: '09' },
        { descripcion: 'LECHE', codDep: '22', codProv: '09', codDist: '07' },
        { descripcion: 'MACHUNGO', codDep: '22', codProv: '09', codDist: '02' },
        { descripcion: 'MIRAFLORES', codDep: '22', codProv: '09', codDist: '07' },
        { descripcion: 'MORALES', codDep: '22', codProv: '09', codDist: '10' },
        { descripcion: 'NAVARRO', codDep: '22', codProv: '09', codDist: '05' },
        { descripcion: 'NUEVE DE ABRIL', codDep: '22', codProv: '09', codDist: '01' },
        { descripcion: 'NUEVO SAN JUAN', codDep: '22', codProv: '09', codDist: '11' },
        { descripcion: 'PELEJO', codDep: '22', codProv: '09', codDist: '06' },
        { descripcion: 'PONGO ISLA', codDep: '22', codProv: '09', codDist: '07' },
        { descripcion: 'PROGRESO KM.30', codDep: '22', codProv: '09', codDist: '09' },
        { descripcion: 'PUCALLPA', codDep: '22', codProv: '09', codDist: '07' },
        { descripcion: 'PUERTO MERCEDES', codDep: '22', codProv: '09', codDist: '11' },
        { descripcion: 'PUNTA DEL ESTE', codDep: '22', codProv: '09', codDist: '01' },
        { descripcion: 'REFORMA', codDep: '22', codProv: '09', codDist: '11' },
        { descripcion: 'SAN ANTONIO  RIO HUALLAGA', codDep: '22', codProv: '09', codDist: '11' },
        { descripcion: 'SAN ANTONIO DE CUMBAZA', codDep: '22', codProv: '09', codDist: '12' },
        { descripcion: 'SAN JOSE 2 DE MAYO', codDep: '22', codProv: '09', codDist: '07' },
        { descripcion: 'SAN JOSE DE YANAYACU', codDep: '22', codProv: '09', codDist: '07' },
        { descripcion: 'SAN JOSE KM.34', codDep: '22', codProv: '09', codDist: '09' },
        { descripcion: 'SAN JUAN RIO HUALLAGA', codDep: '22', codProv: '09', codDist: '11' },
        { descripcion: 'SAN PEDRO DE CUMBAZA', codDep: '22', codProv: '09', codDist: '12' },
        { descripcion: 'SANTA MARTHA', codDep: '22', codProv: '09', codDist: '07' },
        { descripcion: 'SANTA ROSA DE CHIPAOTA', codDep: '22', codProv: '09', codDist: '04' },   
        { descripcion: 'SANTA ROSA DE CUMBAZA', codDep: '22', codProv: '09', codDist: '01' },
        { descripcion: 'SANTA ROSILLO CHIPURANA', codDep: '22', codProv: '09', codDist: '07' },
        { descripcion: 'SAUCE', codDep: '22', codProv: '09', codDist: '13' },
        { descripcion: 'SHAPAJA', codDep: '22', codProv: '09', codDist: '14' },
        { descripcion: 'SHILCAYO', codDep: '22', codProv: '09', codDist: '04' },
        { descripcion: 'TARAPOTO', codDep: '22', codProv: '09', codDist: '01' },
        { descripcion: 'TIPISHCA', codDep: '22', codProv: '09', codDist: '05' },
        { descripcion: 'TUNUNTUNUMBA', codDep: '22', codProv: '09', codDist: '02' },
        { descripcion: 'UTCURARCA', codDep: '22', codProv: '09', codDist: '01' },
        { descripcion: 'YACUCATINA', codDep: '22', codProv: '09', codDist: '08' },
        { descripcion: 'YARINA', codDep: '22', codProv: '09', codDist: '05' }        
    ],
    condicion: ['NOMBRADO', 'CONTRATADO', 'SERUM', 'RESIDENTE', 'INTERNO', 'ALUMNO', 'AGENTE COMUNITARIO', 'OTROS', 'DESTACADO']
}
const getters = {
    getInstituciones(state) {
        return state.instituciones
    },
    getCiudadList(state) {
        return state.ciudadList
    },
    getProfesionesList(state) {
        return state.profesion
    },
    getCondicion(state) {
        return state.condicion
    },
    getMicroRed(state) {
        return state.microRed
    },
    getEstablecimiento (state) {
        return state.establecimiento
    }
}
export default { state, getters }