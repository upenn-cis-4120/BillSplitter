import React from "react";
import screenshot from "../assets/IMG_4181.PNG";

const About = () => {
  return (
    <div className="about-section" style={{ padding: "20px", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h1>BillSplitter</h1>
      <p style={{marginBottom: "20px"}}>
        The motivation behind BillSplitter came from the fact that as college students, we often do things together with our friends, especially getting food. It is not a rare occurrence to struggle to get everyone to pay their share. Some people will only pay back the menu price for their item, even though tax and tip cause it to actually cost more. Sometimes, people insist on an even split of the bill, even though they purchased disproportionately more than everyone else. BillSplitter is meant to solve these problems by allowing users to just snap a picture of a receipt, and send everyone a request for the exact amount they owe based on that receipt.
      </p>
      
      <h2>User Insights</h2>
      <p style={{marginBottom: "20px"}}>
        When we were first experimenting with our initial prototypes, we faced hurdles due to the color-scheme and initial design choices. The users who viewed our initial prototypes did not like the red and blue color scheme at all and found it visually distracting and not appealing at all. The users also did not like our original home page design, especially since the website was meant to act as a mobile application. We received feedback from numerous people who all recommended reworking the original color scheme and design elements. Because of this, we had to decide on a path forward. After discussing among ourselves and the users who criticized the previous design, we decided to choose a green color scheme as the theme to use. Because green has a subtle association with money, this would be a good fit for BillSplitter. However, we were unsure of how to use the green color-scheme. We were thinking of either a darker version with light green colors or a lighter white version with darker green colors to contrast.
      </p>
      <p>
        When finalizing the design direction to go, we ran a study with two variants of BillSplitter, a light-mode version and a dark-mode version. In the experiment, we would randomize which version was shown to the user first, so that that would not affect the results of the study. After letting the users use each of the two variants, they answer four questions. Two of the questions were on the visual appeal of each design, ranked on a 5-point Likert Scale and two questions were on the ease-of-use of each design, also ranked on a 5-point Likert scale. After gathering these results, we ran a t-test comparison and found the light-mode variant fared better in both metrics. Overall, we came out of the study with the following insights:
      </p>
      <ol>
        <li>
        First, we found that the light-mode version was considerably easier to use than the dark-mode version. As our app aimed to make splitting bills easier than it is currently, ease-of-use was a crucial metric for us when deciding what direction to take when designing the application.
        </li>
        <li>
        Secondly, we found that some users prefer the familiarity of the light-mode version, because other mobile social payment applications available today like Venmo and Paypal also use a lighter theme by default.
        </li>
        <li>
        Next, we found that although some users preferred the visual appeal of the dark-mode variant, many of them still found the light-mode variant to have greater ease-of-use. Because ease-of-use is more important for the app we were trying to create, this insight was crucial.
        </li>
        <li>
        Additionally, we also found some users were unsure fully of what the app was meant to do. Before the camera functionality was implemented, the app did not have a clear sense of purpose. This insight let us know that storing the receipt images within the requests was crucial to building a distinctive feature for BillSplitter.
        </li>
        <li>
        Lastly, we found that the most important features to have front and center were the recent transactions and having the camera in the center of the taskbar. These changes were made following the initial prototypes, and our experiment with users confirmed that this change was the right one to make. The most common features to use after opening the app are the camera and then viewing the transactions on the home page.
        </li>
      </ol>
      
      <h2>Design Choice</h2>
      <p style={{marginBottom: "20px"}}>
      When first making the design choice, we decided the pages we would include would be the login and register pages after the user first starts the app. Then, we would have a homepage, a page with the user’s bills, a camera page, a page with the user’s friends, and a settings/user profile page. We decided to include a taskbar so users can easily change between these pages when using the application. Initially we had an image and title for each of these on the taskbar so it would be intuitive for people to select which one to go to. We went for a red and blue color scheme and had the design elements change within the two colors based on what they were.
      </p>
      <p>
      This initial design faced criticism on its visual appeal, especially when it came to its color scheme. We decided to do a complete redesign of BillSplitter. First, we changed the color-scheme from red and blue to just green. This gives it a more uniform feel and green symbolizes money, which our app is used to share and transfer. We then settled on a light-mode design with green colors after performing an experiment against an alternate dark-mode design. Additionally, we reworked the taskbar to be more visually appealing. We removed the titles for each of the buttons and made it just logos. Because mobile app users are used to taskbars, we used a similar layout to most apps. We decided on the 5 icons before, but the order was set to home, then bills, then camera, then friends, then user profile/settings. The placement of the home page, camera page, and user profile page are similar to most other mobile applications, so after some experimenting it would not be difficult for users to understand what each icon meant.
      </p>
      <img 
      src={screenshot} 
      alt="Current design of the BillSplitter application" 
      style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }} 
      />
      <p style={{ fontSize: "0.9em", color: "#555", marginBottom: "20px"}}><i>
        Caption: Current design of the BillSplitter application on the homepage, containing a welcome message, the user’s current balance, recent transactions, and the taskbar on the bottom.
      </i></p>
      <p style={{marginBottom: "20px"}}>
        These design changes proved successful, and most users found the new app design much more appealing than the previous design. The taskbar was highlighted as having improved heavily by users who tried both versions. The green color-scheme was much more uniform and visually appealing when compared to the previous red and blue color-scheme. Overall, the current design was found visually appealing by users who tried it, so the path forward would be to keep this overall design and build upon it.
      </p>

      <h2>Overall Project Takeaways</h2>
      <p style={{marginBottom: "20px"}}>
      Overall, this project taught us many things about the design process. We started with three designs that each of us thought of. We then narrowed it down to BillSplitter based on the use cases of each design, and what we thought would be the most useful. Then, we made our first prototype. Making this first prototype was crucial to learn what to change early on when developing BillSplitter. We realized what worked and what didn’t work. We were able to change the key parts that users didn’t like, in particular the color-scheme and the taskbar. Being able to do this, we saw immense improvement in how BillSplitter was perceived. This proved to be a great learning experience in how to examine people’s reactions on design and use those reactions to make insights on how to take design forward.
      </p>
    </div>
  );
};

export default About;
