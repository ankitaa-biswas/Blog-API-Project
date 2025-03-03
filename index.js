import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
  {
    id:4,
    title:"The Future of Space Exploration: Beyond the Moon and Mars",
    content:
    "The dream of interplanetary travel is closer than ever. With advancements in propulsion technology, robotics, and AI-driven space exploration, scientists are working toward missions beyond Mars. From the potential colonization of the Moon to ambitious plans for exploring Europa’s subsurface oceans, the future of space exploration is full of possibilities. Private companies like SpaceX and Blue Origin, alongside government agencies, are accelerating humanity’s journey into the cosmos.",
    author:"Emily Carter",
    date:"2023-08-15T11:45:00Z"
  },
  {
    id:5,
    title:"Cybersecurity in the Age of Quantum Computing",
    content:
    "As quantum computers advance, the future of cybersecurity is at stake. Traditional encryption methods may become obsolete as quantum algorithms crack even the strongest cryptographic codes. This raises the urgency for post-quantum cryptography—developing security measures that can withstand quantum threats. Governments, research institutions, and tech giants are racing to find solutions before quantum supremacy renders today’s security protocols vulnerable.",
    author:"Daniel Foster",
    date:"2023-08-20T16:10:00Z"
  },
  {
    id:6,
    title:"The Rise of Remote Work and the Future of Offices",
    content:"The pandemic permanently reshaped work culture. With the rise of remote and hybrid work models, companies are rethinking traditional office spaces. Employees are prioritizing flexibility, and businesses are investing in digital tools for seamless collaboration. While some predict a decline in office spaces, others believe hybrid models will redefine the future of corporate environments. The question remains—will remote work become the norm or remain a privilege?",
    author:"Olivia Reynolds",
    date:"2023-08-25T13:20:00Z"
  }
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// GET All posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});


// POST a new post
app.post("/posts",(req,res)=>{
  const newId=lastId+=1;
  const post={
    id:newId,
    title:req.body.title,
    content:req.body.content,
    author:req.body.author,
    date:new Date(),

  };
lastId=newId;
posts.push(post);
res.status(201).json(post);
})

// PATCH a post when you just want to update one parameter


app.patch("/posts/:id",(req,res)=>{
  const post=posts.find((p)=> p.id===parseInt(req.params.id));
  if(!post) return res.status(404).json({message:"post not found"});
  if(req.body.title) post.title=req.body.title;
  if(req.body.author) post.author=req.body.author;
  if(req.body.content) post.content=req.body.content;
  res.json(post);

})

//CHALLENGE 5: DELETE a specific post by providing the post id.

app.delete("/posts/:id",(req,res)=>{
 const index=posts.findIndex((p)=>p.id===parseInt(req.params.id));
 if(index===-1) return res.status(404).json({message:"post not found"});

  posts.splice(index,1);
  res.json({message:`post deleted`});


});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
