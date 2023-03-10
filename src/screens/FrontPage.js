import { Button, Text, View } from "react-native";
import { ScrollView, TouchableOpacity, Image } from 'react-native';
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { collection, addDoc, query, onSnapshot } from 'firebase/firestore'
import { database, storage } from '../../config/firebase';

import { getAuth, signInAnonymously } from "firebase/auth";
import { useState, useEffect } from "react";

const newsCollection = "NewsArticleList"

const auth = getAuth();

signInAnonymously(auth)
  .then(() => {
    // Signed in..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
});

/*
const button_1 = () => {
        const newsArticle = GetNewsArticle()
        navigation.navigate("News Page", { title: newsArticle.title, image: newsArticle.image, credits: newsArticle.credits, article: newsArticle.article} )
    }
    const button_2 = () => {
        const testText = {title: "testTitle", image: "testImage", credits: "testCredits", article: "testArticle"}
        console.log('saving data: ' + testText)
        addDoc(collection(database, newsCollection), testText)
    }
    const button_3 = () => {
      console.log('button 3 pressed')
      SaveNewsArticle()
    }
*/

export default function FrontPage() {
  const [newsArticles, setNewsArticles] = useState([]);
  const navigation = useNavigation();

  const button_1 = (article) => {
    navigation.navigate("News Page", article);
  };
  const button_2 = () => {
    console.log('navigating to admin page')
    navigation.navigate("Admin Page");
  }

  const readDB = async () => {
    const reference = collection(database, newsCollection);
    const q = query(reference, (ref) => ref.orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const _newsArticles = [];
      snapshot.forEach((doc) => {
        _newsArticles.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      setNewsArticles(_newsArticles);
    });
  };

  useEffect(() => {
    readDB();
  }, []);

  return (
    <ScrollView style={frontPageStyles.page}>
      <View>
        <Button
        title='admin page'
        onPress={button_2}
        />
        <Text style={frontPageStyles.title}>Welcome to the News</Text>
      </View>
      <View style={frontPageStyles.articleList}>
        {newsArticles.map((article) => (
          <View key={article.key} style={frontPageStyles.article}>
            <TouchableOpacity onPress={() => button_1(article)} style={frontPageStyles.articleButton}>
              <Text style={frontPageStyles.articlePreview}>{article.title}</Text>
              <Image
            source={{uri: `${article.image}`,}}
            style={frontPageStyles.newsImage}
            />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View>
        <Text>Bottom</Text>
      </View>
    </ScrollView>
  );
}

function getNewsList(){
  
}

function SaveNewsArticle(){
  /*
  <Button
        title='Save Test'
        onPress={button_test}/>
  */
    const newsArticle = [
      {
        title: "Tuborg Nyheder!",
        image: "https://fadnord.dk/wp-content/uploads/sites/3/2019/11/gr%C3%B8n-tuborg-frog-eye_1.png",
        credits: "Migselv idag",
        article: "News News News, nyheder baah"
      },
      {
        title: "Tysk politi mener, at en enkelt gerningsmand stod bag drabeligt skyderi i Hamborg",
        image: "https://asset.dr.dk/imagescaler/?protocol=https&server=www.dr.dk&file=%2Fimages%2Fother%2F2023%2F03%2F10%2Fscanpix-20230310-020228-3.jpg&scaleAfter=crop&quality=70&w=960&h=640",
        credits: "Sean Coogan - I DAG KL. 06:09",
        article: `Et skyderi i den tyske storby Hamborg i aftes har kostet adskillige mennesker livet.

        If??lge det tyske medie Bild er syv personer dr??bt og otte s??ret, men dette er i skrivende stund ikke bekr??ftet af tysk politi.
        
        Motivet er fortsat ukendt, men her til morgen oplyser politiet i Hamborg, at man regner med, at en enkelt gerningsmand st??r bag skyderiet.
        
        L??S OGS??:Flere personer meldes dr??bt ved skudepisode i Hamborg
        Hamborgs politi skriver p?? Twitter, at der blev "affyret skud i en kirke p?? Deelb??ge Strasse", og en talsmand for politiet Holger Vehren fort??ller, hvad der m??dte betjentene, da de rykkede ind:
        
        - Betjentene, der gik ind i bygningen, fandt personer, der var alvorligt og d??deligt s??ret af skydev??ben. Betjentene h??rte ogs?? et skud fra etagerne h??jere oppe, og deroppe fandt de endnu en person, lyder det fra talsmanden, der siger, at gerningsmanden kan v??re blandt de dr??bte.`
      },
      {
        title: "Myndighederne vil snart kunne sende h??jlydte advarsler til alle i Danmark med en smartphone",
        image: "https://asset.dr.dk/imagescaler/?protocol=https&server=www.dr.dk&file=%2Fimages%2Fcrop%2F2023%2F03%2F08%2F1678309589_ljoh_a_indland_varsling_hq-00.17.57.09.jpg&scaleAfter=crop&quality=70&w=960&h=540",
        credits: "Laura Kirkeb??k-Johansson & Jakob Trolle - 48 MIN. SIDEN",
        article: "VidenVidenViden"
      },
      {
        title: "Dameglad hit-rapper g??ster Danmark: Det er det, man vil kalde dum rap",
        image: "https://asset.dr.dk/imagescaler/?protocol=https&server=www.dr.dk&file=%2Fimages%2Fcrop%2F2018%2F12%2F03%2F1543833250_gettyimages-919769940.jpg&scaleAfter=crop&quality=70&w=720&h=405",
        credits: "Christian Mejdahl Buhl - 3. DEC 2018",
        article: `Han er f??dt 17. august i ??r 2000.

        Det var samme ??r, Britney Spears udgav 'Oops!... I Did It Again', Br??drene Olsen vandt Eurovision Song Contest, og storfilmen 'Gladiator' havde premiere.
        
        Lil Pump har i en alder af blot 18 ??r gjort kometkarriere i musikbranchen. P?? trods af sine f?? levede ??r har han allerede arbejdet sammen med nogle af hiphoppens sv??rv??gtere som Kanye West, 2 Chainz, Gucci Mane og Rick Ross.
        
        I aften g??ster han s?? dansk jord, n??r han fyrer op under Vega i K??benhavn med sin SoundCloud-rap og hits i form af sange som 'Gucci Gang', 'Esskeetit' og 'I Love It' sammen med f??rn??vnte Kanye West.
        
        Lyt til 'I Love It' herunder, mens du l??ser videre:`
      },

      {
        title: "DR frar??der alle ansatte at bruge TikTok ??? lidt af en overreaktion, mener korrespondent",
        image: "https://asset.dr.dk/imagescaler/?protocol=https&server=www.dr.dk&file=%2Fimages%2Fcrop%2F2023%2F03%2F09%2F1678370180_scanpix-20230223-211428-7_1.jpg&scaleAfter=crop&quality=70&w=960&h=540",
        credits: "Allan Nisgaard, I G??R KL. 20:31",
        article: `I de seneste uger er flere politikere og statsansatte blevet frar??det at bruge appen TikTok.

        Nu er turen kommet til ansatte i DR.
        
        Efter en sikkerhedsvurdering frar??der DR nu alle medarbejdere at bruge og installere TikTok p?? arbejdstelefoner.
        
        Det vil dog fortsat v??re muligt for journalister at bruge TikTok til research p?? s??rlige TikTok-telefoner.

       - Vi er en organisation, som er en del af beredskabet og er forpligtet til at kunne udkomme. Vi behandler ogs?? kilder og f??lsomme oplysninger. S?? p?? baggrund af det vurderer vi, at det er bedst at anbefale, at medarbejderne ikke bruger TikTok, siger Niels Ammitzb??ll, underdirekt??r for HR i DR.
       Udmeldingen kommer, efter at Center for Cybersikkerhed har advaret mod sikkerhedsricisi ved brug af den kinesiske app.
        `
      }
  ]
  newsArticle.forEach(test => {
    addDoc(collection(database, newsCollection), test);
  })
    
}

function GetNewsArticle(){
    console.log('getting news article')
    return {
      title: "Tuborg Nyheder",
      image: "https://fadnord.dk/wp-content/uploads/sites/3/2019/11/gr%C3%B8n-tuborg-frog-eye_1.png",
      credits: "Migselv idag",
      article: "News News News, nyheder baah"
  }
}

const frontPageStyles = StyleSheet.create({
  page: {
    marginTop: 5,
    marginRight: 15,
    marginLeft: 15,
  }, 
  title: {
    fontSize: 24,
  }, 
  articleList: {

  }, 
  article: {
    backgroundColor: 'lightgrey',
    marginTop: 15,
    padding: 10,
    borderRadius: 15,
  }, 
  articleButton: {

  }, 
  articlePreview: {
    fontSize: 24,
  }, 
  newsImage: {
    width: 150,
    height: 150,
  },
  bottom: {
    // Make it fixed maybe?

  }

});


 