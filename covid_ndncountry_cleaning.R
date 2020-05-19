#Load libraries
library(tidyverse)
library(lubridate)
library(readr)

#load ICT data
ndncntry_covid = read.csv("C:/Users/MariahTso/Desktop/UCLA/aisc_covid/ICT_downloads/ICT_514_749pm_pst.csv") #read csv file
covid <- data.frame(ndncntry_covid) #create dataframe
rezpop = read.csv("C:/Users/MariahTso/Documents/covid_ndnCountry/reservation_pop.csv") #read csv with tribal popoulations
rez_pop <- data.frame(rezpop) #create dataframe

#load John Hopkin's data for States
urlfile="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/05-12-2020.csv" #update date in file name
uscovid <-read_csv(url(urlfile))

#change data to tibbles
covid <- as_tibble(covid)
rez_pop <- as_tibble(rez_pop)

#rename columns from original file
colnames(covid)[5] <- c("Where") #Remove ? from name
colnames(covid)[8] <- c("date") #remove spaces
covid <- subset(covid, select = -c(X)) #remove extraneous column

#clean Tribe names
covid$Where[ which(covid$Where %in% c("Cherokee","Cherokee Nation", "Cherokee Nation of Oklahoma"))] <- "Cherokee"
covid$Where[ which(covid$Where %in% c("Bishop Paiute","Bishop Pauite"))] <- "Bishop Paiute"
covid$Where[ which(covid$Where %in% c("Gila River Indian Commmunity","Gila River Indian Community"))] <- "Gila River Indian Community"
covid$Where[ which(covid$Where %in% c("Ho-Chunk","Ho-Chunk Nation"))] <- "Ho-Chunk Nation"
covid$Where[ which(covid$Where %in% c("Mississippi Band of Choctaw Indians","MIssissippi Band of Choctaw Indians"))] <- "Mississippi Band of Choctaw Indians"
covid$Where[ which(covid$Where %in% c("Navajo","Navajo ", "Navajo Nation"))] <- "Navajo Nation"
covid$Where[ which(covid$Where %in% c("Seneca Nation","Seneca Nation - Allegany"))] <- "Seneca Nation"
covid$Where[ which(covid$Where %in% c("White Mountain Apache","White Mountain Apache Tribe", "Fort Apache Indian Reservation"))] <- "White Mountain Apache"
covid$Where[ which(covid$Where %in% c("Choctaw Nation","Choctaw Nation of Oklahoma"))] <- "Choctaw Nation"
covid$Where[ which(covid$Where %in% c("Lummi","Lummi Nation"))] <- "Lummi"
covid$Where <- droplevels(covid$Where)

dim(unique(cbind(covid$Where, covid$date)))

#converting dates to appropriate format
covid$date <- paste0(covid$date, "-2020")
covid$date <- mdy(covid$date)

#combining cases based on tribe, state, and date  
covidcases <- covid %>% filter(Case == "1")%>% group_by(Where, date, Case) %>% summarise(n())
colnames(covidcases)[4] <- c("cases")
colnames(covidcases)[1] <- c("nation")
covidcases <- subset(covidcases, select = -c(Case))
covidcases_wide <- spread(covidcases, date, cases)

#check case total
tot_cases <- sum(covidcases$cases)
print(tot_cases)

#summarizing deaths by tribe & date
coviddeaths <- covid %>% filter(Deaths == "1") %>% group_by(Where, date, Deaths) %>% summarise(n())
colnames(coviddeaths)[4] <- c("deaths")
colnames(coviddeaths)[1] <- c("nation")
coviddeaths <- subset(coviddeaths, select = -c(Deaths))
coviddeaths_wide <- spread(coviddeaths, date, deaths)

#check death total
tot_deaths <- sum(coviddeaths$deaths)
print(tot_deaths)

#combine daily cases & deaths by tribe
totdailybytribe <- full_join(coviddeaths, covidcases, by = c("nation" = "nation", "date" = "date"), copy = FALSE, name = "join")
totdailybytribe <- totdailybytribe[order(totdailybytribe$nation),]
write.csv(totdailybytribe, "C:/Users/MariahTso/Documents/covid_ndnCountry/totalbytribe.csv")

#NDN Country Total
covidcases2 <- covid %>% filter(Case == 1) %>% group_by(date) %>% count(Case, sort = TRUE, name = "cases")
coviddeaths2 <- covid %>% filter(Deaths == 1) %>% group_by(date) %>% count(Deaths, sort = TRUE, name = "deaths")
coviddeaths2 <- subset(coviddeaths2, select = -c(Deaths))
covidcases2 <- subset(covidcases2, select = -c(Case))
totndncntry <- full_join(coviddeaths2, covidcases2, by = c("date" = "date"), copy = FALSE, name = "join")
write.csv(totndncntry, "C:/Users/MariahTso/Documents/covid_ndnCountry/totalndncntry.csv")

#combining cases for all tribes
casesbytribe <-  covid %>% filter(Case == "1")%>% group_by(Where) %>% summarize(n())
colnames(casesbytribe)[2] <- c("cases")

#combining deaths for all tribes
deathsbytribe <-  covid %>% filter(Deaths == "1")%>% group_by(Where) %>% summarize(n())
colnames(deathsbytribe)[2] <- c("deaths")

#join case & death totals by tribe
totbytribe <- full_join(casesbytribe, deathsbytribe, by = "Where", copy = FALSE, name = "join")

#join with population data
colnames(rez_pop)[4] <- c("Where")
tribepop <- full_join(totbytribe, rez_pop, by = "Where", copy = FALSE, name = "join")
tribe_pop_anti <- anti_join(totbytribe, rez_pop, by = "Where", copy = FALSE, name = "join")

#add case & death rates
triberates <- tribepop %>% mutate(deathrate = (deaths/tot_pop)*100000,
                                  caserate = (cases/tot_pop)*100000)
triberates <- subset(triberates, !is.na(triberates$caserate))
write.csv(triberates, "C:/Users/MariahTso/Documents/covid_ndnCountry/triberates.csv")

#rename & merge tribal & state rates
triberates2 <- triberates
uscovid2 <- uscovid
rates_combo <- full_join(triberates2, uscovid2, by = c("Where" = "Province_State", "caserate" = "Incident_Rate", "cases" = "Confirmed", "deaths" = "Deaths"), copy = FALSE, name = "join")
rates_combo2 <- subset(rates_combo, caserate > 200)
#reassigning Country_Region
rates_combo2$Country_Region[rates_combo2$Country_Region == "US"] <- "State"
rates_combo2$Country_Region[is.na(rates_combo2$Country_Region)] <- "Tribal Nation"
write.csv(rates_combo2, "C:/Users/MariahTso/Documents/covid_ndnCountry/rates_combo.csv")

  
