import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { baseUrl, fetchApi } from '../utils/fetchApi';
import Property from '../components/property';

interface NextPage {

}

interface BannerType {
  purpose: string;
  imageUrl: string;
  title1: string,
  title2: string,
  desc1: string,
  desc2: string,
  linkName: string,
  buttonText: string
}

const Banner = ({ purpose, imageUrl, title1, title2, desc1, desc2, linkName, buttonText }: BannerType) => {
  return (
    <Flex flexWrap={'wrap'} justifyContent="center" alignItems={'center'} m="10">
      <Image src={imageUrl} width={500} height={300} alt="banner" />
      <Box p="5">
        <Text color="gray.500" fontSize={'sm'} fontWeight="medium">{purpose}</Text>
        <Text fontSize={'3xl'} fontWeight="bold">{title1} <br /> {title2}</Text>
        <Text color="gray.700" fontSize={'lg'} paddingTop={3} paddingBottom={3}>{desc1} <br /> {desc2}</Text>
        <Button fontSize={"xl"} >
          <Link href={linkName}>
            {buttonText}
          </Link>
        </Button>
      </Box>
      {purpose}
    </Flex>
  )
}


interface HomeType {
  propertiesForSale: [],
  propertiesForRent: []
}

const Home: NextPage = ({ propertiesForRent, propertiesForSale }: HomeType) => {
  return (
    <div >
      <h1>Hello world</h1>
      <Banner
        purpose='Rent a home'
        title1="Rental homes for"
        title2="everyone"
        desc1='Explore Apartments, Villas, Homes'
        desc2='and more'
        buttonText='Explore Renting'
        linkName='/search?purpose=for-rent'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      />
      <Flex wrap={'wrap'} >
        {propertiesForRent?.map((property:any) => <Property property={property} key={property?.id}/>)}
      </Flex>
      <Banner
        purpose='Buy a home'
        title1="Find, Buy and Own your"
        title2="Dream Home"
        desc1='Explore Apartments, Villas, Homes'
        desc2='and more'
        buttonText='Explore Buying'
        linkName='/search?purpose=for-sale'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
      />
       <Flex wrap={'wrap'} >
        {propertiesForSale?.map((property:any) => <Property property={property} key={property?.id}/>)}
      </Flex>
    </div>
  )
}


export async function getStaticProps() {
  const propertiesForSale: any = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  const propertiesForRent: any = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)

  return {
    props: {
      propertiesForSale: propertiesForSale?.hits,
      propertiesForRent: propertiesForRent?.hits
    }
  }
}


export default Home
