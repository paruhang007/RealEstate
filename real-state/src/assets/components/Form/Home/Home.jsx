

export default function Home(){

    const componentDidMound= (event) =>{
        event.preventDefault();

        fetch("http://localhost:5000/userData", {
        method: "POST",
        crossDomain:true,
        headers: {
          "Content-Type" : "application/json",
          Acceept:"application/jason",
          "Access-Control-Allow-Origin": "*",
        },
        body:JSON.stringify({
          token : window.localStorage.getItem("token"),
        }),
      })
      .then((res)=> res.json())
      .then((data)=>{
        console.log(data, "home");
      });
    }
    return(
        <div>
        <h1>welcome to dashboard </h1>
        <h2>it is still in development</h2>
        </div>
    );
}