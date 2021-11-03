import EditServiceForm from "../../../components/service/editServiceForm";
import {useRouter} from "next/router";

// pre build the static path , this will not run in the front end
export async function getStaticPaths() {
    const serviceListData = [
        {
            serviceId: 1,
            treatmentType: "type1 ",
            name: "z ",
            description: "d",
            price: 100,
            duration: "1h30m",
            code: "code1",
            offerBy: ["E1", "E2"],
            status: "blocked",
            dateCreated: "2018 / 10/ 02",
        },
        {
            serviceId: 2,
            treatmentType: "type2 ",
            name: "a ",
            description: "c",
            price: 100,
            duration: "1h30m",
            code: "code2",
            offerBy: ["E1", "E2"],
            status: "active",
            dateCreated: "2018 / 10/ 03",
        },
        {
            serviceId: 3,
            treatmentType: "type3 ",
            name: "x ",
            description: "b",
            price: 100,
            duration: "1h30m",
            code: "code3",
            offerBy: ["E1", "E2"],
            status: "blocked",
            dateCreated: "2018 / 10/ 04",
        },
        {
            serviceId: 4,
            treatmentType: "type4 ",
            name: "y",
            description: "a",
            price: 100,
            duration: "1h30m",
            code: "code4",
            offerBy: ["E1", "E2"],
            status: "active",
            dateCreated: "2018 / 10/ 08",
        },
    ];
    const pathparams = serviceListData.map((item) => {
        return { params: { serviceId: item.serviceId.toString()} }
    });
    return {
        paths: pathparams,
        fallback:  false // See the "fallback" section below
    };
}

export async function getStaticProps(context) {
    const id = context.params.serviceId;
    const res = await fetch(
        "https://api.github.com/repos/visionmedia/superagent"
    );
    const serviceListData = [
        {
            serviceId: 1,
            treatmentType: "type1 ",
            name: "z ",
            description: "d",
            price: 100,
            duration: "1h30m",
            code: "code1",
            offerBy: ["E1", "E2"],
            status: "blocked",
            dateCreated: "2018 / 10/ 02",
        },
        {
            serviceId: 2,
            treatmentType: "type2 ",
            name: "a ",
            description: "c",
            price: 100,
            duration: "1h30m",
            code: "code2",
            offerBy: ["E1", "E2"],
            status: "active",
            dateCreated: "2018 / 10/ 03",
        },
        {
            serviceId: 3,
            treatmentType: "type3 ",
            name: "x ",
            description: "b",
            price: 100,
            duration: "1h30m",
            code: "code3",
            offerBy: ["E1", "E2"],
            status: "blocked",
            dateCreated: "2018 / 10/ 04",
        },
        {
            serviceId: 4,
            treatmentType: "type4 ",
            name: "y",
            description: "a",
            price: 100,
            duration: "1h30m",
            code: "code4",
            offerBy: ["E1", "E2"],
            status: "active",
            dateCreated: "2018 / 10/ 08",
        },
    ];
    return {
        props: { serviceItem: serviceListData[id-1] }, // will be passed to the page component as props
    };
}

function ServiceEditFormPage(props){
    const router = useRouter();
    const {serviceItem} = props;
    const employeeList = ['E1','E2','E3','E4','E5','E6','E7','E8']
    const editHandle=(data)=>{
        console.log('add');
    }
    const closeAddDialog = ()=>{
        router.replace('/service/'+serviceItem.serviceId).then(r => console.log(r));
    }
    console.log(serviceItem);
    return (
        <>
            <EditServiceForm editHandle={editHandle} serviceItem={serviceItem} closeAddDialog={closeAddDialog} employeeList={employeeList}/>
        </>
    )
}
export default ServiceEditFormPage;