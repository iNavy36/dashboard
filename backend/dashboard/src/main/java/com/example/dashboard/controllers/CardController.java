package com.example.dashboard.controllers;

import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dashboard.database.CardRepository;
import com.example.dashboard.database.ListRepository;
import com.example.dashboard.database.UserRepository;
import com.example.dashboard.services.CardService;
import com.example.dashboard.exceptions.NotFoundException;
import com.example.dashboard.model.Card;
import com.example.dashboard.query_interfaces.CardShortened;
import com.fasterxml.jackson.annotation.JsonProperty;

@RestController
@RequestMapping("/card")
public class CardController {
    private final CardRepository cardRepo;
    private final UserRepository userRepo;
    private final ListRepository listRepo;

    public CardController(CardRepository cardRepo, UserRepository userRepo, ListRepository listRepo) {
        this.cardRepo = cardRepo;
        this.userRepo = userRepo;
        this.listRepo = listRepo;
    }

    @GetMapping("/{id}")
    CardShortened one(@PathVariable Long id) {
        return this.cardRepo.getSingleCard(id)
                .orElseThrow(() -> new NotFoundException("card", id));
    }

    @PostMapping(consumes = "application/json")
    CardShortened newCard(@RequestBody CardForm card) {
        if (!userRepo.existsById(card.getUserId()))
            throw new NotFoundException("user", card.getUserId());
        if (!listRepo.existsById(card.getListId()))
            throw new NotFoundException("list", card.getListId());
        return CardService.convertToCardShortened(
                cardRepo.save(new Card(card.getCardContent(), userRepo.getReferenceById(card.getUserId()),
                        listRepo.getReferenceById(card.getListId()))));
    }

    @PutMapping(consumes = "application/json", value = "/{id}/content")
    CardShortened updateCardContent(@RequestBody CardForm card, @PathVariable Long id) {
        if (!userRepo.existsById(card.getUserId()))
            throw new NotFoundException("user", card.getUserId());
        if (!listRepo.existsById(card.getListId()))
            throw new NotFoundException("list", card.getListId());
        Optional<Card> existingCard = cardRepo.findById(id);
        if (existingCard.isPresent()) {
            Card updatedCard = existingCard.get();
            updatedCard.setContent(card.getCardContent());
            return CardService.convertToCardShortened(cardRepo.save(updatedCard));
        } else {
            throw new NotFoundException("card", id);
        }
    }

    @PutMapping(consumes = "application/json", value = "/{id}/move")
    CardShortened moveCard(@RequestBody CardForm card, @PathVariable Long id) {
        if (!userRepo.existsById(card.getUserId()))
            throw new NotFoundException("user", card.getUserId());
        if (!listRepo.existsById(card.getListId()))
            throw new NotFoundException("list", card.getListId());
        Optional<Card> existingCard = cardRepo.findById(id);
        if (existingCard.isPresent()) {
            Card updatedCard = existingCard.get();
            updatedCard.setListEntity(listRepo.getReferenceById(card.getListId()));
            return CardService.convertToCardShortened(cardRepo.save(updatedCard));
        } else {
            throw new NotFoundException("card", id);
        }
    }

    @DeleteMapping(consumes = "application/json", value = "/{id}")
    Boolean deleteCard(@RequestBody CardForm card, @PathVariable Long id) {
        if (!userRepo.existsById(card.getUserId()))
            throw new NotFoundException("user", card.getUserId());
        if (!cardRepo.existsById(id))
            throw new NotFoundException("card", id);
        cardRepo.deleteById(id);
        return true;
    }
}

class CardForm {
    @JsonProperty("list_id")
    private Long listId;

    @JsonProperty("user_id")
    private Long userId;

    @JsonProperty("content")
    private String cardContent;

    public CardForm(Long listId, Long userId, String cardContent) {
        this.listId = listId;
        this.userId = userId;
        this.cardContent = cardContent;
    }

    public Long getListId() {
        return listId;
    }

    public void setListId(Long listId) {
        this.listId = listId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCardContent() {
        return cardContent;
    }

    public void setCardContent(String cardContent) {
        this.cardContent = cardContent;
    }
}
