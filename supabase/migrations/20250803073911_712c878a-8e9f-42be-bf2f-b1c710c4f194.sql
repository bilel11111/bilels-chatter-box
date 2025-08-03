-- Create quotes table for daily quotes in Arabic and English
CREATE TABLE public.quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  text_en TEXT NOT NULL,
  text_ar TEXT NOT NULL,
  author_en TEXT,
  author_ar TEXT,
  day_of_year INTEGER NOT NULL CHECK (day_of_year >= 1 AND day_of_year <= 366),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Create policy for reading quotes (public access)
CREATE POLICY "Quotes are publicly readable" 
ON public.quotes 
FOR SELECT 
USING (true);

-- Create unique constraint for day of year
CREATE UNIQUE INDEX idx_quotes_day_of_year ON public.quotes(day_of_year);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_quotes_updated_at
BEFORE UPDATE ON public.quotes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert 100 daily quotes in Arabic and English
INSERT INTO public.quotes (text_en, text_ar, author_en, author_ar, day_of_year) VALUES
('The best time to plant a tree was 20 years ago. The second best time is now.', 'أفضل وقت لزراعة شجرة كان قبل 20 عاماً. ثاني أفضل وقت هو الآن.', 'Chinese Proverb', 'مثل صيني', 1),
('Success is not final, failure is not fatal: it is the courage to continue that counts.', 'النجاح ليس نهائياً، والفشل ليس قاتلاً: الشجاعة للمتابعة هي ما يهم.', 'Winston Churchill', 'ونستون تشرتشل', 2),
('The only way to do great work is to love what you do.', 'الطريقة الوحيدة لإنجاز عمل عظيم هي أن تحب ما تفعله.', 'Steve Jobs', 'ستيف جوبز', 3),
('Innovation distinguishes between a leader and a follower.', 'الابتكار يميز بين القائد والتابع.', 'Steve Jobs', 'ستيف جوبز', 4),
('Life is what happens to you while you are busy making other plans.', 'الحياة هي ما يحدث لك بينما أنت مشغول بوضع خطط أخرى.', 'John Lennon', 'جون لينون', 5),
('The future belongs to those who believe in the beauty of their dreams.', 'المستقبل ينتمي لأولئك الذين يؤمنون بجمال أحلامهم.', 'Eleanor Roosevelt', 'إليانور روزفلت', 6),
('It is during our darkest moments that we must focus to see the light.', 'خلال لحظاتنا الأكثر ظلمة يجب أن نركز لنرى النور.', 'Aristotle', 'أرسطو', 7),
('Whoever is happy will make others happy too.', 'من كان سعيداً سيجعل الآخرين سعداء أيضاً.', 'Anne Frank', 'آن فرانك', 8),
('Do not go where the path may lead, go instead where there is no path and leave a trail.', 'لا تذهب حيث قد يقودك الطريق، اذهب بدلاً من ذلك حيث لا يوجد طريق واترك أثراً.', 'Ralph Waldo Emerson', 'رالف والدو إمرسون', 9),
('In the middle of difficulty lies opportunity.', 'في وسط الصعوبة تكمن الفرصة.', 'Albert Einstein', 'ألبرت أينشتاين', 10),
('Be yourself; everyone else is already taken.', 'كن نفسك؛ الجميع محجوز بالفعل.', 'Oscar Wilde', 'أوسكار وايلد', 11),
('Two things are infinite: the universe and human stupidity; and I am not sure about the universe.', 'شيئان لا نهائيان: الكون والغباء البشري؛ ولست متأكداً من الكون.', 'Albert Einstein', 'ألبرت أينشتاين', 12),
('You only live once, but if you do it right, once is enough.', 'تعيش مرة واحدة فقط، ولكن إذا فعلت ذلك بالطريقة الصحيحة، فمرة واحدة تكفي.', 'Mae West', 'ماي ويست', 13),
('Be the change that you wish to see in the world.', 'كن التغيير الذي تريد أن تراه في العالم.', 'Mahatma Gandhi', 'المهاتما غاندي', 14),
('A room without books is like a body without a soul.', 'غرفة بدون كتب مثل جسد بدون روح.', 'Marcus Tullius Cicero', 'ماركوس توليوس شيشرون', 15),
('You know you are in love when you cannot fall asleep because reality is finally better than your dreams.', 'تعرف أنك واقع في الحب عندما لا تستطيع النوم لأن الواقع أصبح أخيراً أفضل من أحلامك.', 'Dr. Seuss', 'دكتور سوس', 16),
('A friend is someone who knows all about you and still loves you.', 'الصديق هو شخص يعرف كل شيء عنك ومازال يحبك.', 'Elbert Hubbard', 'إلبرت هوبارد', 17),
('To live is the rarest thing in the world. Most people just exist.', 'العيش هو أندر شيء في العالم. معظم الناس مجرد موجودون.', 'Oscar Wilde', 'أوسكار وايلد', 18),
('Darkness cannot drive out darkness: only light can do that.', 'الظلام لا يمكن أن يطرد الظلام: النور وحده يستطيع فعل ذلك.', 'Martin Luther King Jr.', 'مارتن لوثر كينغ جونيور', 19),
('Hate cannot drive out hate: only love can do that.', 'الكراهية لا يمكن أن تطرد الكراهية: الحب وحده يستطيع فعل ذلك.', 'Martin Luther King Jr.', 'مارتن لوثر كينغ جونيور', 20),
('Yesterday is history, tomorrow is a mystery, today is a gift.', 'الأمس تاريخ، الغد غموض، اليوم هدية.', 'Eleanor Roosevelt', 'إليانور روزفلت', 21),
('The only impossible journey is the one you never begin.', 'الرحلة المستحيلة الوحيدة هي التي لا تبدأها أبداً.', 'Tony Robbins', 'توني روبينز', 22),
('Life is really simple, but we insist on making it complicated.', 'الحياة بسيطة حقاً، لكننا نصر على جعلها معقدة.', 'Confucius', 'كونفوشيوس', 23),
('The greatest glory in living lies not in never falling, but in rising every time we fall.', 'أعظم مجد في الحياة لا يكمن في عدم السقوط أبداً، بل في النهوض كلما سقطنا.', 'Nelson Mandela', 'نيلسون مانديلا', 24),
('The way to get started is to quit talking and begin doing.', 'الطريقة للبدء هي التوقف عن الكلام والبدء في الفعل.', 'Walt Disney', 'والت ديزني', 25),
('Your time is limited, so do not waste it living someone else life.', 'وقتك محدود، لذا لا تضيعه في عيش حياة شخص آخر.', 'Steve Jobs', 'ستيف جوبز', 26),
('If life were predictable it would cease to be life, and be without flavor.', 'لو كانت الحياة قابلة للتنبؤ لتوقفت عن كونها حياة، وأصبحت بلا طعم.', 'Eleanor Roosevelt', 'إليانور روزفلت', 27),
('If you look at what you have in life, you will always have more.', 'إذا نظرت إلى ما لديك في الحياة، ستحصل دائماً على المزيد.', 'Oprah Winfrey', 'أوبرا وينفري', 28),
('If you look at what you do not have in life, you will never have enough.', 'إذا نظرت إلى ما ليس لديك في الحياة، فلن تحصل على ما يكفي أبداً.', 'Oprah Winfrey', 'أوبرا وينفري', 29),
('If you set your goals ridiculously high and it is a failure, you will fail above everyone else success.', 'إذا وضعت أهدافك عالية بشكل سخيف وفشلت، ستفشل فوق نجاح الجميع.', 'James Cameron', 'جيمس كاميرون', 30),
('The purpose of our lives is to be happy.', 'الهدف من حياتنا هو أن نكون سعداء.', 'Dalai Lama', 'الدالاي لاما', 31),
('Get busy living or get busy dying.', 'انشغل بالعيش أو انشغل بالموت.', 'Stephen King', 'ستيفن كينغ', 32),
('You have within you right now, everything you need to deal with whatever the world can throw at you.', 'لديك بداخلك الآن، كل ما تحتاجه للتعامل مع أي شيء يمكن أن يرميه العالم عليك.', 'Brian Tracy', 'برايان تريسي', 33),
('Believe you can and you are halfway there.', 'آمن أنك تستطيع وستكون في منتصف الطريق.', 'Theodore Roosevelt', 'ثيودور روزفلت', 34),
('The only person you are destined to become is the person you decide to be.', 'الشخص الوحيد المقدر لك أن تصبحه هو الشخص الذي تقرر أن تكونه.', 'Ralph Waldo Emerson', 'رالف والدو إمرسون', 35),
('Go confidently in the direction of your dreams. Live the life you have imagined.', 'اذهب بثقة في اتجاه أحلامك. عش الحياة التي تخيلتها.', 'Henry David Thoreau', 'هنري ديفيد ثورو', 36),
('When you reach the end of your rope, tie a knot in it and hang on.', 'عندما تصل إلى نهاية حبلك، اربط عقدة فيه وتمسك.', 'Franklin D. Roosevelt', 'فرانكلين د. روزفلت', 37),
('Always remember that you are absolutely unique. Just like everyone else.', 'تذكر دائماً أنك فريد تماماً. تماماً مثل أي شخص آخر.', 'Margaret Mead', 'مارغريت ميد', 38),
('Do not judge each day by the harvest you reap but by the seeds that you plant.', 'لا تحكم على كل يوم بالحصاد الذي تجنيه ولكن بالبذور التي تزرعها.', 'Robert Louis Stevenson', 'روبرت لويس ستيفنسون', 39),
('The future belongs to those who prepare for it today.', 'المستقبل ينتمي لأولئك الذين يستعدون له اليوم.', 'Malcolm X', 'مالكولم إكس', 40),
('Education is the most powerful weapon which you can use to change the world.', 'التعليم هو السلاح الأقوى الذي يمكنك استخدامه لتغيير العالم.', 'Nelson Mandela', 'نيلسون مانديلا', 41),
('The best revenge is massive success.', 'أفضل انتقام هو النجاح الهائل.', 'Frank Sinatra', 'فرانك سيناترا', 42),
('People often say that motivation does not last. Well, neither does bathing.', 'الناس يقولون غالباً أن الدافع لا يدوم. حسناً، الاستحمام أيضاً لا يدوم.', 'Zig Ziglar', 'زيغ زيغلار', 43),
('That is why we recommend it daily.', 'لهذا نوصي به يومياً.', 'Zig Ziglar', 'زيغ زيغلار', 44),
('Life shrinks or expands in proportion to one courage.', 'الحياة تنكمش أو تتوسع بما يتناسب مع شجاعة المرء.', 'Anais Nin', 'أنايس نين', 45),
('If you hear a voice within you say you cannot paint, then by all means paint and that voice will be silenced.', 'إذا سمعت صوتاً بداخلك يقول أنك لا تستطيع الرسم، فارسم بكل الوسائل وسيصمت ذلك الصوت.', 'Vincent Van Gogh', 'فينسنت فان جوخ', 46),
('There is only one way to avoid criticism: do nothing, say nothing, and be nothing.', 'هناك طريقة واحدة فقط لتجنب النقد: لا تفعل شيئاً، لا تقل شيئاً، ولا تكن شيئاً.', 'Aristotle', 'أرسطو', 47),
('Ask and it will be given to you; search, and you will find; knock and the door will be opened for you.', 'اطلبوا تُعطوا؛ ابحثوا تجدوا؛ اقرعوا يُفتح لكم.', 'Jesus', 'عيسى عليه السلام', 48),
('The only person you are destined to become is the person you decide to be.', 'الشخص الوحيد المقدر لك أن تصبحه هو الشخص الذي تقرر أن تكونه.', 'Ralph Waldo Emerson', 'رالف والدو إمرسون', 49),
('What we think, we become.', 'ما نفكر فيه، نصبح عليه.', 'Buddha', 'بوذا', 50),
('Twenty years from now you will be more disappointed by the things that you did not do than by the ones you did do.', 'بعد عشرين عاماً من الآن ستشعر بخيبة أمل أكبر من الأشياء التي لم تفعلها أكثر من التي فعلتها.', 'Mark Twain', 'مارك توين', 51),
('So throw off the bowlines, sail away from safe harbor, catch the trade winds in your sails.', 'لذا تخلص من حبال الرسو، أبحر بعيداً عن المرفأ الآمن، والتقط الرياح التجارية في أشرعتك.', 'Mark Twain', 'مارك توين', 52),
('Explore, Dream, Discover.', 'استكشف، احلم، اكتشف.', 'Mark Twain', 'مارك توين', 53),
('It is better to fail in originality than to succeed in imitation.', 'من الأفضل أن تفشل في الأصالة من أن تنجح في التقليد.', 'Herman Melville', 'هيرمان ميلفيل', 54),
('The road to success and the road to failure are almost exactly the same.', 'طريق النجاح وطريق الفشل متشابهان تقريباً بالضبط.', 'Colin R. Davis', 'كولين ر. ديفيس', 55),
('Success is walking from failure to failure with no loss of enthusiasm.', 'النجاح هو المشي من فشل إلى فشل دون فقدان الحماس.', 'Winston Churchill', 'ونستون تشرتشل', 56),
('All progress takes place outside the comfort zone.', 'كل التقدم يحدث خارج منطقة الراحة.', 'Michael John Bobak', 'مايكل جون بوباك', 57),
('People who are unable to motivate themselves must be content with mediocrity.', 'الأشخاص الذين لا يستطيعون تحفيز أنفسهم يجب أن يكتفوا بالعادية.', 'Andrew Carnegie', 'أندرو كارنيجي', 58),
('No matter how you feel, get up, dress up and show up.', 'مهما كان شعورك، انهض، تأنق، واحضر.', 'Regina Brett', 'ريجينا بريت', 59),
('Opportunities do not happen. You create them.', 'الفرص لا تحدث. أنت تخلقها.', 'Chris Grosser', 'كريس جروسر', 60),
('Love what you do and do what you love.', 'أحب ما تفعله وافعل ما تحبه.', 'Ray Bradbury', 'راي برادبري', 61),
('Do not let what you cannot do interfere with what you can do.', 'لا تدع ما لا تستطيع فعله يتداخل مع ما تستطيع فعله.', 'John Wooden', 'جون وودن', 62),
('You miss 100% of the shots you do not take.', 'تفوت 100% من التسديدات التي لا تسددها.', 'Wayne Gretzky', 'واين جريتزكي', 63),
('The most difficult thing is the decision to act, the rest is merely tenacity.', 'أصعب شيء هو قرار التصرف، الباقي مجرد مثابرة.', 'Amelia Earhart', 'أميليا إيرهارت', 64),
('Every strike brings me closer to the next home run.', 'كل ضربة تقربني من الهدف التالي.', 'Babe Ruth', 'بيب روث', 65),
('Definiteness of purpose is the starting point of all achievement.', 'وضوح الهدف هو نقطة انطلاق كل إنجاز.', 'W. Clement Stone', 'دبليو كليمنت ستون', 66),
('Life is not about getting and having, it is about giving and being.', 'الحياة ليست عن الحصول والامتلاك، إنها عن العطاء والكينونة.', 'Kevin Kruse', 'كيفن كروز', 67),
('We must balance conspicuous consumption with conscious capitalism.', 'يجب أن نوازن بين الاستهلاك الواضح والرأسمالية الواعية.', 'Kevin Kruse', 'كيفن كروز', 68),
('Strive not to be a success, but rather to be of value.', 'لا تسع لتكون ناجحاً، بل لتكون ذا قيمة.', 'Albert Einstein', 'ألبرت أينشتاين', 69),
('You are never too old to set another goal or to dream a new dream.', 'لست مسناً أبداً لوضع هدف آخر أو حلم جديد.', 'C.S. Lewis', 'سي إس لويس', 70),
('If you are not willing to risk the usual, you will have to settle for the ordinary.', 'إذا لم تكن مستعداً للمخاطرة بالمعتاد، فسيتعين عليك الاكتفاء بالعادي.', 'Jim Rohn', 'جيم رون', 71),
('Trust because you are willing to accept the risk, not because it is safe or certain.', 'ثق لأنك مستعد لقبول المخاطرة، وليس لأنه آمن أو مؤكد.', 'Anonymous', 'مجهول', 72),
('Take up one idea. Make that one idea your life - think of it, dream of it, live on that idea.', 'خذ فكرة واحدة. اجعل تلك الفكرة حياتك - فكر بها، احلم بها، عش على تلك الفكرة.', 'Swami Vivekananda', 'سوامي فيفيكاناندا', 73),
('Let the brain, muscles, nerves, every part of your body, be full of that idea.', 'دع الدماغ والعضلات والأعصاب، كل جزء من جسدك، يمتلئ بتلك الفكرة.', 'Swami Vivekananda', 'سوامي فيفيكاناندا', 74),
('And just leave every other idea alone.', 'واترك كل فكرة أخرى وحدها.', 'Swami Vivekananda', 'سوامي فيفيكاناندا', 75),
('This is the way to success.', 'هذا هو طريق النجاح.', 'Swami Vivekananda', 'سوامي فيفيكاناندا', 76),
('A person who never made a mistake never tried anything new.', 'شخص لم يرتكب خطأ أبداً لم يجرب شيئاً جديداً أبداً.', 'Albert Einstein', 'ألبرت أينشتاين', 77),
('The person who says it cannot be done should not interrupt the person who is doing it.', 'الشخص الذي يقول أنه لا يمكن فعل ذلك يجب ألا يقاطع الشخص الذي يفعله.', 'Chinese Proverb', 'مثل صيني', 78),
('There are no traffic jams along the extra mile.', 'لا توجد اختناقات مرورية على الميل الإضافي.', 'Roger Staubach', 'روجر ستوباخ', 79),
('It is never too late to be what you might have been.', 'لم يفت الأوان أبداً لتكون ما كان يمكن أن تكون عليه.', 'George Eliot', 'جورج إليوت', 80),
('You become what you believe.', 'تصبح ما تؤمن به.', 'Oprah Winfrey', 'أوبرا وينفري', 81),
('I would rather die of passion than of boredom.', 'أفضل أن أموت من الشغف بدلاً من الملل.', 'Vincent van Gogh', 'فينسنت فان جوخ', 82),
('A truly rich man is one whose children run into his arms when his hands are empty.', 'الرجل الغني حقاً هو من يركض أطفاله إلى أحضانه عندما تكون يداه فارغتين.', 'Anonymous', 'مجهول', 83),
('It is not what you do for your children, but what you have taught them to do for themselves.', 'ليس ما تفعله لأطفالك، بل ما علمتهم أن يفعلوه لأنفسهم.', 'Ann Landers', 'آن لاندرز', 84),
('That will make them successful human beings.', 'هذا ما سيجعلهم بشراً ناجحين.', 'Ann Landers', 'آن لاندرز', 85),
('Build your own dreams, or someone else will hire you to build theirs.', 'ابن أحلامك الخاصة، أو سيوظفك شخص آخر لبناء أحلامه.', 'Farrah Gray', 'فرح جراي', 86),
('The battles that count are not the ones for gold medals.', 'المعارك التي تهم ليست تلك من أجل الميداليات الذهبية.', 'Jesse Owens', 'جيسي أوينز', 87),
('The struggles within yourself are the most important ones.', 'الصراعات داخل نفسك هي الأهم.', 'Jesse Owens', 'جيسي أوينز', 88),
('The struggles within yourself - the invisible battles inside all of us.', 'الصراعات داخل نفسك - المعارك الخفية داخل كل منا.', 'Jesse Owens', 'جيسي أوينز', 89),
('That is where it is won or lost.', 'هناك حيث تُكسب أو تُخسر.', 'Jesse Owens', 'جيسي أوينز', 90),
('Education costs money, but then so does ignorance.', 'التعليم يكلف مالاً، لكن الجهل أيضاً يكلف.', 'Sir Claus Moser', 'السير كلاوس موزر', 91),
('I have learned over the years that when ones mind is made up, this diminishes fear.', 'تعلمت على مر السنين أنه عندما يتخذ المرء قراراً، فإن هذا يقلل الخوف.', 'Rosa Parks', 'روزا باركس', 92),
('It takes courage to grow up and become who you really are.', 'يتطلب الأمر شجاعة للنمو وتصبح من أنت حقاً.', 'E.E. Cummings', 'إي. إي. كامينغز', 93),
('Remembering that you are going to die is the best way I know to avoid the trap of thinking you have something to lose.', 'تذكر أنك ستموت هو أفضل طريقة أعرفها لتجنب فخ التفكير أن لديك شيئاً لتخسره.', 'Steve Jobs', 'ستيف جوبز', 94),
('You are already naked. There is no reason not to follow your heart.', 'أنت عار بالفعل. لا يوجد سبب لعدم اتباع قلبك.', 'Steve Jobs', 'ستيف جوبز', 95),
('Challenges are what make life interesting and overcoming them is what makes life meaningful.', 'التحديات هي ما يجعل الحياة مثيرة للاهتمام والتغلب عليها هو ما يجعل الحياة ذات معنى.', 'Joshua J. Marine', 'جوشوا جي مارين', 96),
('If you want to lift yourself up, lift up someone else.', 'إذا كنت تريد أن ترفع نفسك، ارفع شخصاً آخر.', 'Booker T. Washington', 'بوكر تي واشنطن', 97),
('I have been impressed with the urgency of doing.', 'لقد تأثرت بإلحاح الفعل.', 'Leonardo da Vinci', 'ليوناردو دا فينشي', 98),
('Knowing is not enough; we must apply.', 'المعرفة ليست كافية؛ يجب أن نطبق.', 'Leonardo da Vinci', 'ليوناردو دا فينشي', 99),
('Being willing is not enough; we must do.', 'الاستعداد ليس كافياً؛ يجب أن نفعل.', 'Leonardo da Vinci', 'ليوناردو دا فينشي', 100);