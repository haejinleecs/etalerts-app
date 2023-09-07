# Team 20 Project

Team 20

Project Name:
ETAlerts

# Team Overview
Alyssa Lanter - alant-15

Alex Kim - KimDos7

Abdul Khan - abdulkhanCS

Haejin Lee - haejinleecs

# Innovative Idea

In light of recent news on increasing cancellations and delays of flights, our team was inspired to create an application in order to target  uncertainties surrounding flights, especially when it comes to passengers' ability to communicate these updates and changes to their close friends and family. Our application will utilize flight data provided by APIs in order to update the user's friends, family, or other persons of interest throughout the flight. This will specifically be the flight that the user wants to track (in practicality, the user would track the flight they are taking!). Given the flight number of a specific flight, our application will successfully update the list of contacts that the user wants to periodically update in a specified time interval.

There are existing applications with similar features as our proposed application. These provide flight data but none have a free feature to notify specific contacts. Our application goal is to gather data about flights and to seamlessly integrate the data into a legible format in order to alert a list of contacts that the user wants to update on a given flight. 

# Data and Functionality

The four preliminary data types our application will feature are: Close Contacts, Updates, Custom Messages, and Flight History. The 'Close Contacts' and 'Updates' data types are the foundational pieces to the functionality of ETAlerts effective. The 'Close Friends' data type contains a list of other Users that will be sent periodic Updates regarding the current user's flight progress. The 'Update' data type will contain information such as departure/arrival time, altitude, weather, delays, and other helpful pieces of information describing the progress of the flight. The 'Custom Messages' data type will enable the user to send custom sms messages to their list of contacts. These messages will be sent automatically upon a trigger event chosen by the user. For example, if the user wants to update their spouse when the user is 30 minutes away from landing via a custom text message, ETAlerts will send that message automatically when the plane is 30 minutes from landing according to the flight data API. 'Flight History' is our last preliminary data type. Flight History keeps track of the user's past flights and every Update sent during those flights. This can be visible to anyone or just the user's Close Contacts.

# License

We will be using the MIT license.

[MIT License](https://opensource.org/licenses/MIT)

