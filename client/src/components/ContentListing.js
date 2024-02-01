import { useContext, useState } from "react"
import { appContext } from "../App"
import { Box, Card, CardContent, Typography, Link, Pagination } from "@mui/material"

const ContentListing = () => { 

    const {appState} = useContext(appContext)

    const {userContents,isLoggedin} = appState 

    const [pageNo,setPageNo] = useState(1)

    const handlePageChange = (event, value) => {
        setPageNo(value);
    }

    return (
        <>
        {isLoggedin ? 
        (<Box sx={{width:'50%',minWidth:'400px'}}>
            <Typography variant="h2" gutterBottom>My contents</Typography>
            {   userContents.length==0 && 
                <Typography gutterBottom color="text.secondary">No Contents created.</Typography>
            }
            {
                userContents.slice(pageNo*3-3,pageNo*3).map(ele=>{
                    return <Card key={ele._id}
                        sx={{m:'2vh'}}>
                        <CardContent>
                        <Typography sx={{ fontSize: '2rem' }} 
                        color="text.secondary" 
                        gutterBottom>
                            {ele.title}
                        </Typography>
                        <Typography sx={{ fontSize: '1rem' }}  
                        gutterBottom>
                            Description : {ele.description}
                        </Typography>
                        <Typography>
                            Link: <Link href={ele.contentLink} target='_blank'>{ele.contentLink} </Link>
                        </Typography>
                        </CardContent>
                    </Card>
                })
            }
            { userContents.length!==0 && <Pagination sx={{display:'flex',justifyContent:'center'}} 
                count={Math.ceil(userContents.length/3)} 
                value={pageNo} onChange={handlePageChange}/>}
        </Box>)
        : 
        (<Typography gutterBottom color="text.secondary">Login to view contents.</Typography>)
        }
        </>
    )
}

export default ContentListing