/* Week6/article2.txt: 36 предложений (sent_tokenize) и результаты, посчитанные в Python (NLTK + sumy).
   scores — вероятность предложения по биграммам (исправленная версия кода, см. шаг 4); textrank/luhn/lsa — номера выбранных предложений для 1..5. */
window.ARTICLE = {
"sents": [
"Introduction Recently, the use of various types of multimedia data such as images, videos, and audios has shown its explosive growth, so the content-based search became of great importance[12][7][13][5][4][3].",
"For the successful content-based search, an indexing scheme and a query processing scheme are the key issues to be considered.",
"Despite of its great advance, audio search has been less investigated than either image or video searches [8].",
"In this paper, we address the development of a system that detects plagiarism based on the similar melody searching, which is an operation that finds the melodies similar to a given query melody from a music database.",
"Specifically, the plagiarism detection system is to examine if there exist such melodies in music databases as being similar to any melodies of a composerís interest.",
"Without realizing it, any composers may be involved in diverse plagiarism disputes.",
"The main purpose of this research is to help composers to avoid unnecessary plagiarism disputes by using the plagiarism detection system in advance.",
"Unlike such previous systems as [6][8][9][10], our plagiarism detection system has its unique characteristics as follows: • A novel similarity model: it solves the problem of misjudgment by supporting alignment as well as shifting in the similarity model.",
"• Multidimensional indexing: it makes a basic framework for fast searching by employing a multidimensional index built on melody features.",
"Music Plagiarism Detection Using Melody Databases 685 • A three-step query processing: it provides fast search ability by taking a three-step query processing method, which consists of index searching, window stitching, and post-processing.",
"The results of performance evaluation show that our approach outperforms the sequential-scan-based one in the speed of searching up to around 31 times.",
"This paper is organized as follows.",
"Section 2 describes a novel similarity model for computing the similarity between two different melodies.",
"Section 3 discusses an indexing method for efficient similar melody searching from melody databases.",
"Section 4 presents a three-step query processing method which employs the proposed indexing method.",
"To show its superiority, we evaluate the performance of our system in Section 5.",
"Finally, Section 6 summarizes and concludes the paper.",
"2 Similarity Model This section describes a similarity model to compute the similarity between two different melodies.",
"2.1 Basic Model A melody of a music is defined as a list of snatches, i.e.",
"as a sequence S = <(si, sLi)> (0<=i<n), called a melody sequence.",
"Here, si denotes the ith tone of a melody, and sLi denotes the length of the ith tone of a melody.",
"Also, the number of tones, n, is called the length of a melody sequence.",
"For example, the following melody with a C major key in four-quarters time is described as a melody sequence of length 4, i.e.",
"<(sol, 1), (la, 1/2), (la, 1/2), (fa, 2)>1.",
"For comparison of any two melody sequences S = <(si, sLi)>(0<=i<n) and Q = <(qj, qLj)>(0<=j<m), we make the following assumptions: • Assumption 1: S and Q should have the same meter.",
"In other words, two melody sequences of different meters are excluded for similarity searching.",
"• Assumption 2: It always holds that n=m and sLi = qLj if i=j, for all (i, j)'s.",
"Thus, two melody sequences to be compared should be of the same length, and the lengths of their corresponding tones should be also the same.",
"For any two melody sequences S and Q satisfying these assumptions, the similarity between S and Q is computed based on Definition 1 described below.",
"This paper addresses the development of a system that detects plagiarism based on similar melody searching.",
"Similar melody searching is to find the melodies similar to a given query melody from a music database.",
"For this purpose, we propose a novel similarity model that supports alignment as well as shifting.",
"Also, we suggest a method for indexing the features extracted from every melody, and a method for processing plagiarism detection by using the index.",
"With our plagiarism detection system, composers can easily search for the melodies similar to their ones from music databases.",
"Through performance evaluation via a series of experiments, we show the effectiveness of our approach.",
"The results reveal that our approach outperforms the sequential-scanbased one in speed up to around 31 times."
],
"scores": [
4.1336e-05,
3.96825e-05,
0.000318878,
1.25534e-08,
2.36206e-05,
0.222222,
0.000171468,
1.4881e-06,
3.54308e-06,
4.44361e-10,
0.000330688,
0.166667,
3.96825e-05,
6.32694e-06,
0.00123457,
0.00173611,
0.0833333,
2.26757e-06,
0.000566893,
0.00231481,
3.72024e-05,
0.00138889,
4.6503e-07,
0.00694444,
6.27934e-10,
0.000260417,
0.0015625,
0.000208333,
1.35634e-07,
0.00248016,
5.42309e-06,
0.00428571,
2.04128e-07,
1.18103e-05,
0.0833333,
0.0555556
],
"top": [
[
"melody",
28
],
[
"search",
14
],
[
"similarity",
10
],
[
"plagiarism",
9
],
[
"system",
8
],
[
"similar",
8
],
[
"sequence",
8
],
[
"model",
7
],
[
"index",
6
],
[
"query",
6
],
[
"music",
6
],
[
"detection",
6
],
[
"method",
6
],
[
"section",
6
],
[
"two",
6
]
],
"textrank": {
"1": [
3
],
"2": [
3,
20
],
"3": [
3,
18,
20
],
"4": [
3,
7,
18,
20
],
"5": [
3,
7,
18,
20,
27
]
},
"luhn": {
"1": [
3
],
"2": [
3,
10
],
"3": [
3,
7,
10
],
"4": [
3,
7,
10,
20
],
"5": [
3,
7,
10,
20,
24
]
},
"lsa": {
"1": [
33
],
"2": [
2,
33
],
"3": [
2,
29,
33
],
"4": [
2,
25,
29,
33
],
"5": [
2,
9,
25,
29,
33
]
}
};
