// Seed reviews, keyed by product name. `user` refers to a name in data/users.js;
// the seeder resolves it to the created user's ObjectId.
const reviews = {
  'Kani Pashmina Shawl — Chinar Jaal': [
    {
      user: 'Priya Nair',
      rating: 5,
      comment:
        'Bought this for my mother’s 60th. The weave is unbelievably fine — you can see the chinar pattern change colour in the light. Came with the authenticity label as described.',
    },
    {
      user: 'Vikram Singh',
      rating: 5,
      comment:
        'Worth every rupee. You can tell it is loom-woven, not printed — the pattern is identical on both sides.',
    },
    {
      user: 'Ananya Iyer',
      rating: 4,
      comment:
        'Gorgeous shawl, softer than anything I own. Four stars only because delivery took a week longer than promised.',
    },
  ],
  'Sozni Embroidered Pashmina Stole': [
    {
      user: 'Zara Khan',
      rating: 5,
      comment:
        'The sozni work is so fine I needed my reading glasses to see the individual stitches. The reverse really is almost identical.',
    },
    {
      user: 'Meera Pillai',
      rating: 4,
      comment:
        'Lovely stole, drapes beautifully over a kurta. The ash-rose shade is more muted in person, which I actually prefer.',
    },
    {
      user: 'Aarav Mehta',
      rating: 4,
      comment:
        'Gifted it to my wife — she has not taken it off since. Packaging could be nicer for the price.',
    },
  ],
  'Kashmiri Saffron — Mongra Grade, 2g': [
    {
      user: 'Ananya Iyer',
      rating: 5,
      comment:
        'Three strands turned my whole pot of biryani golden with that unmistakable aroma. Nothing like the supermarket stuff.',
    },
    {
      user: 'Rohan Gupta',
      rating: 5,
      comment:
        'Deep red stigmas, no yellow bits, harvest date on the vial. This is the real Pampore product.',
    },
    {
      user: 'Priya Nair',
      rating: 5,
      comment:
        'Used it for kheer during Onam visits — everyone asked where the saffron was from.',
    },
    {
      user: 'Arjun Sharma',
      rating: 4,
      comment:
        'Excellent quality, though 2g goes quickly once the family finds out you have it.',
    },
  ],
  'Kahwa Blend Tin — Almond & Saffron, 150g': [
    {
      user: 'Aarav Mehta',
      rating: 5,
      comment:
        'Tastes exactly like the kahwa I had on a houseboat in Srinagar. The almond slivers are generous.',
    },
    {
      user: 'Meera Pillai',
      rating: 4,
      comment:
        'Warming and fragrant. I brew it in a saucepan with a little honey — no samovar needed.',
    },
    {
      user: 'Zara Khan',
      rating: 5,
      comment: 'My daily 4pm ritual now. The tin lasted me about two months.',
    },
  ],
  'Hand-Carved Walnut Wood Bowl Set': [
    {
      user: 'Vikram Singh',
      rating: 5,
      comment:
        'Heavy, solid walnut with crisp carving on the rims. We use the big one as a fruit bowl and it gets compliments constantly.',
    },
    {
      user: 'Priya Nair',
      rating: 4,
      comment:
        'Beautiful grain. Remember to oil them occasionally — the seller includes care instructions.',
    },
    {
      user: 'Rohan Gupta',
      rating: 4,
      comment:
        'Well finished, no rough edges. The middle bowl had a small knot, but honestly it adds character.',
    },
  ],
  'Papier-Mâché Naqashi Keepsake Box': [
    {
      user: 'Meera Pillai',
      rating: 5,
      comment:
        'The hand-painting is museum quality — tiny gold flowers over deep blue. I keep my earrings in it.',
    },
    {
      user: 'Ananya Iyer',
      rating: 5,
      comment:
        'So light you would not believe it is paper. The lacquer finish feels like glass.',
    },
    {
      user: 'Arjun Sharma',
      rating: 4,
      comment:
        'Bought two as return gifts. Both had different patterns, which the recipients loved.',
    },
  ],
  'Traditional Copper Samovar': [
    {
      user: 'Zara Khan',
      rating: 5,
      comment:
        'A functioning samovar, not a showpiece — we fired it with charcoal on Eid and it kept kahwa hot for the whole afternoon.',
    },
    {
      user: 'Aarav Mehta',
      rating: 4,
      comment:
        'The chasing work on the body is stunning. It needs regular polishing, but that is copper for you.',
    },
    {
      user: 'Vikram Singh',
      rating: 5,
      comment: 'Centrepiece of my living room. Guests always ask about it.',
    },
  ],
  'Crewel Embroidered Cushion Covers, Set of 2': [
    {
      user: 'Priya Nair',
      rating: 4,
      comment:
        'The wool embroidery is dense and even. Colours match my sofa perfectly — spruce is a deep true green.',
    },
    {
      user: 'Rohan Gupta',
      rating: 5,
      comment:
        'Sturdy backing fabric and a proper concealed zip. These will outlast the sofa.',
    },
    {
      user: 'Meera Pillai',
      rating: 4,
      comment:
        'Lovely texture. Dry clean only, so keep that in mind with kids around.',
    },
  ],
  'Chain-Stitch Namda Rug, 3 x 5 ft': [
    {
      user: 'Arjun Sharma',
      rating: 5,
      comment:
        'Warm underfoot in a Delhi winter and the chain-stitch pattern is packed edge to edge. Smelled faintly of wool for the first week, then settled.',
    },
    {
      user: 'Ananya Iyer',
      rating: 4,
      comment:
        'Thicker than I expected in a good way. Sheds slightly at first — vacuum gently.',
    },
    {
      user: 'Zara Khan',
      rating: 5,
      comment:
        'The pomegranate motif is beautiful. It has made the whole room feel finished.',
    },
  ],
  'Khatamband Walnut Coaster Set': [
    {
      user: 'Rohan Gupta',
      rating: 5,
      comment:
        'Tiny interlocked pieces exactly like a khatamband ceiling — and genuinely no glue lines that I can find. Conversation starter at every dinner.',
    },
    {
      user: 'Vikram Singh',
      rating: 4,
      comment:
        'Handsome set with a solid holder. Wipe spills quickly since the wood is oil-finished.',
    },
    {
      user: 'Priya Nair',
      rating: 4,
      comment: 'Bought as an office gift. Elegant and clearly handmade.',
    },
  ],
  'Willow Wicker Kangri': [
    {
      user: 'Meera Pillai',
      rating: 4,
      comment:
        'Using it as a planter with a money plant and it looks fantastic. Neat, tight weave with cheerful dyed bands.',
    },
    {
      user: 'Aarav Mehta',
      rating: 4,
      comment:
        'Exactly as pictured. The earthen pot inside is nicely made too.',
    },
    {
      user: 'Ananya Iyer',
      rating: 5,
      comment:
        'Such a piece of living history for under a thousand rupees. My grandmother recognised it instantly.',
    },
  ],
  'Aari Embroidered Wool Pheran': [
    {
      user: 'Zara Khan',
      rating: 5,
      comment:
        'Wore it through a Gulmarg trip — warm without being heavy, and the neck embroidery is intricate. Sizing runs true.',
    },
    {
      user: 'Arjun Sharma',
      rating: 4,
      comment:
        'Very comfortable and the raffal wool does not itch. Wish more colours were available.',
    },
    {
      user: 'Rohan Gupta',
      rating: 5,
      comment:
        'Lived in this all winter. Machine wash on wool cycle has been fine so far.',
    },
  ],
  'Pashmina Muffler — Diamond Weave': [
    {
      user: 'Arjun Sharma',
      rating: 5,
      comment:
        'Perfect office-winter muffler — sits flat under a blazer and the diamond weave catches the light beautifully.',
    },
    {
      user: 'Meera Pillai',
      rating: 4,
      comment:
        'Bought one for my father and one for myself. Soft, warm, and the natural colours go with everything.',
    },
  ],
  'Aari Embroidered Wool Jacket': [
    {
      user: 'Zara Khan',
      rating: 5,
      comment:
        'The embroidery is dense enough to feel like a second fabric. I get stopped and asked about it constantly.',
    },
    {
      user: 'Priya Nair',
      rating: 4,
      comment:
        'Beautifully tailored, true to size. The lining makes it comfortable over a thin kurta.',
    },
    {
      user: 'Aarav Mehta',
      rating: 5,
      comment:
        'Gifted to my wife — the vine work on the front panels is genuinely artwork.',
    },
  ],
  'Kashmiri Walnut Kernels, 500g': [
    {
      user: 'Rohan Gupta',
      rating: 5,
      comment:
        'Whole light halves, not broken bits. Noticeably sweeter than the walnuts I get locally — no bitterness at all.',
    },
    {
      user: 'Ananya Iyer',
      rating: 5,
      comment:
        'Fresh and oily the way walnuts should be. The vacuum pack kept them crisp.',
    },
    {
      user: 'Vikram Singh',
      rating: 4,
      comment:
        'Excellent quality. Finished the bag in a week, which says everything.',
    },
  ],
  'Wildflower Forest Honey, 350g': [
    {
      user: 'Meera Pillai',
      rating: 5,
      comment:
        'Thick, floral and clearly raw — it crystallised in December exactly as the label said it would. Lovely on morning toast.',
    },
    {
      user: 'Arjun Sharma',
      rating: 4,
      comment:
        'Tastes nothing like commercial honey. A spoon in kahwa is my new ritual.',
    },
  ],
  'Engraved Copper Kahwa Cups, Set of 4': [
    {
      user: 'Aarav Mehta',
      rating: 5,
      comment:
        'The engraving matches our samovar from the same workshop. Tinned properly inside — no metallic taste at all.',
    },
    {
      user: 'Zara Khan',
      rating: 4,
      comment:
        'Beautiful little cups. They do get hot to hold, so let the kahwa sit a minute.',
    },
    {
      user: 'Priya Nair',
      rating: 5,
      comment:
        'Served filter coffee in these at a dinner party — everyone photographed them.',
    },
  ],
  'Walnut Wood Serving Tray': [
    {
      user: 'Vikram Singh',
      rating: 5,
      comment:
        'One solid plank, no joins. The carved handles are comfortable even fully loaded with a tea set.',
    },
    {
      user: 'Ananya Iyer',
      rating: 4,
      comment:
        'The grain is gorgeous. Slightly heavier than expected, but it feels like it will last decades.',
    },
  ],
  'Papier-Mâché Baubles, Set of 6': [
    {
      user: 'Priya Nair',
      rating: 5,
      comment:
        'Hung them on our Christmas tree and left two up all year — the hand-painting deserves to be seen daily.',
    },
    {
      user: 'Rohan Gupta',
      rating: 4,
      comment:
        'Light, colourful and well finished. The silk cords are a thoughtful touch.',
    },
    {
      user: 'Meera Pillai',
      rating: 5,
      comment:
        'Ordered a second set as gifts. The naqashi box they arrive in is a gift by itself.',
    },
  ],
  'Willow Wicker Picnic Basket': [
    {
      user: 'Ananya Iyer',
      rating: 4,
      comment:
        'Sturdy, deep and handsome. It has carried a full picnic for four without a creak.',
    },
    {
      user: 'Arjun Sharma',
      rating: 5,
      comment:
        'The weave is tight and even — clearly the same hands that make the bread baskets in Srinagar.',
    },
  ],
  'Valley Dry Fruits Gift Box': [
    {
      user: 'Vikram Singh',
      rating: 5,
      comment:
        'The apricots are soft and tangy, nothing like the leathery store-bought kind. The walnut box itself is a keeper.',
    },
    {
      user: 'Priya Nair',
      rating: 4,
      comment:
        'Sent it as a Diwali gift — the family was delighted. Cherries were the highlight.',
    },
    {
      user: 'Meera Pillai',
      rating: 4,
      comment:
        'Fresh and generous portions. A little pricey, but it is clearly premium produce.',
    },
  ],
};

export default reviews;
