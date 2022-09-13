const vectorx = require('./vectorx');
/**
 * 
 * @param {number} n char code  
 * @returns {string} the character given by n
 */
const ch = (n) => {
    return String.fromCharCode(n)
}

const stringx = {}

/**
 * 
 * @param {string} text the text to split into sentences
 * @returns {string[]} an array of strings representing each sentence of the passed text
 */
stringx.getSentences = text => text.match(/\(?[^\.\?\!]+[\.!\?]\)?/g)

/**
 * 
 * @param {string} text the text to split into words
 * @returns {string[]} an array of strings representing each word of the passed text
 */
stringx.getWords=  text  => text.split(" ")

/**
 * 
 * @param {string} text the text to split into characters
 * @returns {string[]} an array of strings representing each character of the passed text
 */
stringx.getChars = text => text.split("")



const stopwords=`a\nable\nabout\nabove\nabst\naccordance\naccording\naccordingly\nacross\nact\nactually\nadded\nadj\naffected\naffecting\naffects\nafter\nafterwards\nagain\nagainst\nah\nall\nalmost\nalone\nalong\nalready\nalso\nalthough\nalways\nam\namong\namongst\nan\nand\nannounce\nanother\nany\nanybody\nanyhow\nanymore\nanyone\nanything\nanyway\nanyways\nanywhere\napparently\napproximately\nare\naren\narent\narise\naround\nas\naside\nask\nasking\nat\nauth\navailable\naway\nawfully\nb\nback\nbe\nbecame\nbecause\nbecome\nbecomes\nbecoming\nbeen\nbefore\nbeforehand\nbegin\nbeginning\nbeginnings\nbegins\nbehind\nbeing\nbelieve\nbelow\nbeside\nbesides\nbetween\nbeyond\nbiol\nboth\nbrief\nbriefly\nbut\nby\nc\nca\ncame\ncan\ncannot\ncan't\ncause\ncauses\ncertain\ncertainly\nco\ncom\ncome\ncomes\ncontain\ncontaining\ncontains\ncould\ncouldnt\nd\ndate\ndid\ndidn't\ndifferent\ndo\ndoes\ndoesn't\ndoing\ndone\ndon't\ndown\ndownwards\ndue\nduring\ne\neach\ned\nedu\neffect\neg\neight\neighty\neither\nelse\nelsewhere\nend\nending\nenough\nespecially\net\net-al\netc\neven\never\nevery\neverybody\neveryone\neverything\neverywhere\nex\nexcept\nf\nfar\nfew\nff\nfifth\nfirst\nfive\nfix\nfollowed\nfollowing\nfollows\nfor\nformer\nformerly\nforth\nfound\nfour\nfrom\nfurther\nfurthermore\ng\ngave\nget\ngets\ngetting\ngive\ngiven\ngives\ngiving\ngo\ngoes\ngone\ngot\ngotten\nh\nhad\nhappens\nhardly\nhas\nhasn't\nhave\nhaven't\nhaving\nhe\nhed\nhence\nher\nhere\nhereafter\nhereby\nherein\nheres\nhereupon\nhers\nherself\nhes\nhi\nhid\nhim\nhimself\nhis\nhither\nhome\nhow\nhowbeit\nhowever\nhundred\ni\nid\nie\nif\ni'll\nim\nimmediate\nimmediately\nimportance\nimportant\nin\ninc\nindeed\nindex\ninformation\ninstead\ninto\ninvention\ninward\nis\nisn't\nit\nitd\nit'll\nits\nitself\ni've\nj\njust\nk\nkeep\tkeeps\nkept\nkg\nkm\nknow\nknown\nknows\nl\nlargely\nlast\nlately\nlater\nlatter\nlatterly\nleast\nless\nlest\nlet\nlets\nlike\nliked\nlikely\nline\nlittle\n'll\nlook\nlooking\nlooks\nltd\nm\nmade\nmainly\nmake\nmakes\nmany\nmay\nmaybe\nme\nmean\nmeans\nmeantime\nmeanwhile\nmerely\nmg\nmight\nmillion\nmiss\nml\nmore\nmoreover\nmost\nmostly\nmr\nmrs\nmuch\nmug\nmust\nmy\nmyself\nn\nna\nname\nnamely\nnay\nnd\nnear\nnearly\nnecessarily\nnecessary\nneed\nneeds\nneither\nnever\nnevertheless\nnew\nnext\nnine\nninety\nno\nnobody\nnon\nnone\nnonetheless\nnoone\nnor\nnormally\nnos\nnot\nnoted\nnothing\nnow\nnowhere\no\nobtain\nobtained\nobviously\nof\noff\noften\noh\nok\nokay\nold\nomitted\non\nonce\none\nones\nonly\nonto\nor\nord\nother\nothers\notherwise\nought\nour\nours\nourselves\nout\noutside\nover\noverall\nowing\nown\np\npage\npages\npart\nparticular\nparticularly\npast\nper\nperhaps\nplaced\nplease\nplus\npoorly\npossible\npossibly\npotentially\npp\npredominantly\npresent\npreviously\nprimarily\nprobably\npromptly\nproud\nprovides\nput\nq\nque\nquickly\nquite\nqv\nr\nran\nrather\nrd\nre\nreadily\nreally\nrecent\nrecently\nref\nrefs\nregarding\nregardless\nregards\nrelated\nrelatively\nresearch\nrespectively\nresulted\nresulting\nresults\nright\nrun\ns\nsaid\nsame\nsaw\nsay\nsaying\nsays\nsec\nsection\nsee\nseeing\nseem\nseemed\nseeming\nseems\nseen\nself\nselves\nsent\nseven\nseveral\nshall\nshe\nshed\nshe'll\nshes\nshould\nshouldn't\nshow\nshowed\nshown\nshowns\nshows\nsignificant\nsignificantly\nsimilar\nsimilarly\nsince\nsix\nslightly\nso\nsome\nsomebody\nsomehow\nsomeone\nsomethan\nsomething\nsometime\nsometimes\nsomewhat\nsomewhere\nsoon\nsorry\nspecifically\nspecified\nspecify\nspecifying\nstill\nstop\nstrongly\nsub\nsubstantially\nsuccessfully\nsuch\nsufficiently\nsuggest\nsup\nsure\tt\ntake\ntaken\ntaking\ntell\ntends\nth\nthan\nthank\nthanks\nthanx\nthat\nthat'll\nthats\nthat've\nthe\ntheir\ntheirs\nthem\nthemselves\nthen\nthence\nthere\nthereafter\nthereby\nthered\ntherefore\ntherein\nthere'll\nthereof\ntherere\ntheres\nthereto\nthereupon\nthere've\nthese\nthey\ntheyd\nthey'll\ntheyre\nthey've\nthink\nthis\nthose\nthou\nthough\nthoughh\nthousand\nthroug\nthrough\nthroughout\nthru\nthus\ntil\ntip\nto\ntogether\ntoo\ntook\ntoward\ntowards\ntried\ntries\ntruly\ntry\ntrying\nts\ntwice\ntwo\nu\nun\nunder\nunfortunately\nunless\nunlike\nunlikely\nuntil\nunto\nup\nupon\nups\nus\nuse\nused\nuseful\nusefully\nusefulness\nuses\nusing\nusually\nv\nvalue\nvarious\n've\nvery\nvia\nviz\nvol\nvols\nvs\nw\nwant\nwants\nwas\nwasnt\nway\nwe\nwed\nwelcome\nwe'll\nwent\nwere\nwerent\nwe've\nwhat\nwhatever\nwhat'll\nwhats\nwhen\nwhence\nwhenever\nwhere\nwhereafter\nwhereas\nwhereby\nwherein\nwheres\nwhereupon\nwherever\nwhether\nwhich\nwhile\nwhim\nwhither\nwho\nwhod\nwhoever\nwhole\nwho'll\nwhom\nwhomever\nwhos\nwhose\nwhy\nwidely\nwilling\nwish\nwith\nwithin\nwithout\nwont\nwords\nworld\nwould\nwouldnt\nwww\nx\ny\nyes\nyet\nyou\nyoud\nyou'll\nyour\nyoure\nyours\nyourself\nyourselves\nyou've\nz\nzero`.split("\n")



/**
 * 
 * @param {string[]} words a list of words to form a search table for
 * @returns {Map<string,string[]>} a map containing prefixes as keys and corresponding words as entries. 
 */
stringx.wordtable = (words) => { 
    const T = new Map()
    for( const word of words){
        const prefix = word.substring(0,Math.min(2,word.length))
        if(T.has(prefix)){
            T.get(prefix).push(word)
        } else { 
            T.set(prefix, [word])
        }   
    }
    return T
}


/**
 * 
 * @param {Map<string,string[]>} words the word table to search
 * @param {string} key the word to search for
 * @returns {boolean} true | false
 */
stringx.tablehas = (table,key) => { 
    const prefix = key.substring(0,Math.min(2,key.length))
    if(!table.has(prefix)) return false
    const parent = table.get(prefix)
    const found = parent.find(word=>word===key)
    if(!!found) return true
    return false
}


/**
 * 
 * @param {string} a 
 * @param {string} b 
 * @returns the edit distance between two strings 
 * @about for edit distance of a vector see vectorx
 */
stringx.editdistance = (a,b)=> { 
    if (a.length === 0) return b.length; 
    if (b.length === 0) return a.length;
  
    var matrix = [];
  
    // increment along the first column of each row
    var i;
    for (i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
  
    // increment each column in the first row
    var j;
    for (j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
  
    // Fill in the rest of the matrix
    for (i = 1; i <= b.length; i++) {
      for (j = 1; j <= a.length; j++) {
        if (b.charAt(i-1) == a.charAt(j-1)) {
          matrix[i][j] = matrix[i-1][j-1];
        } else {
          matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                  Math.min(matrix[i][j-1] + 1, // insertion
                                           matrix[i-1][j] + 1)); // deletion
        }
      }
    }
  
    return matrix[b.length][a.length];
}

/**
 * 
 * @param {*} vector a vector to be converted into a string
 * @returns a string representation of the passed vector
 * @about the inverse operation of vectorx.word2vector ** 
 */
stringx.vec2word = ( vector ) => vector.map(v=>ch(v)).join("")


/**
 * 
 * @param {string} text the text to be cleaned 
 * @returns {string} the original text with all stop words removed to lower case. 
 */
stringx.cleanText = text => { 

    const table = stringx.wordtable(stopwords)
    const stopwords_removed = stringx.getWords(text.toLowerCase())
        .filter(w=>!stringx.tablehas(table,w))
        .join(" ")

    return stopwords_removed
}




module.exports = stringx