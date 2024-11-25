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

import com.example.dashboard.database.BoardRepository;
import com.example.dashboard.database.ListRepository;
import com.example.dashboard.database.ListService;
import com.example.dashboard.exceptions.BoardNotFoundException;
import com.example.dashboard.exceptions.ListNotFoundException;
import com.example.dashboard.model.ListEntity;
import com.example.dashboard.query_interfaces.ListShortened;
import com.fasterxml.jackson.annotation.JsonProperty;

@RestController
@RequestMapping("/list")
public class ListController {
    private final ListRepository listRepo;
    private final BoardRepository boardRepo;

    public ListController(ListRepository listRepo, BoardRepository boardRepo) {
        this.listRepo = listRepo;
        this.boardRepo = boardRepo;
    }

    @GetMapping("/{id}")
    ListShortened one(@PathVariable Long id) {
        return ListService.getSingleList(this.listRepo.getSingleList(id))
                .orElseThrow(() -> new ListNotFoundException(id));
    }

    @PostMapping(consumes = "application/json")
    ListShortened newList(@RequestBody ListForm list) {
        if (!boardRepo.existsById(list.getBoardId()))
            throw new BoardNotFoundException(list.getBoardId());
        return ListService.convertToListShortened(
                listRepo.save(new ListEntity(list.getListTitle(), boardRepo.getReferenceById(list.getBoardId()))));
    }

    @PutMapping(consumes = "application/json", value = "/{id}")
    ListShortened updateList(@RequestBody ListForm list, @PathVariable Long id) {
        if (!boardRepo.existsById(list.getBoardId()))
            throw new BoardNotFoundException(list.getBoardId());
        Optional<ListEntity> existingList = listRepo.findById(id);
        if (existingList.isPresent()) {
            ListEntity updatedList = existingList.get();
            updatedList.setName(list.getListTitle());
            return ListService.convertToListShortened(listRepo.save(updatedList));
        } else {
            throw new ListNotFoundException(id);
        }
    }

    @DeleteMapping(consumes = "application/json", value = "/{id}")
    Boolean deleteList(@RequestBody ListForm list, @PathVariable Long id) {
        if (!boardRepo.existsById(list.getBoardId()))
            throw new BoardNotFoundException(list.getBoardId());
        listRepo.deleteById(id);
        return true;
    }
}

class ListForm {
    @JsonProperty("board_id")
    private Long boardId;

    @JsonProperty("list_title")
    private String listTitle;

    public ListForm(Long boardId, String listTitle) {
        this.boardId = boardId;
        this.listTitle = listTitle;
    }

    public Long getBoardId() {
        return boardId;
    }

    public void setBoardId(Long boardId) {
        this.boardId = boardId;
    }

    public String getListTitle() {
        return listTitle;
    }

    public void setListTitle(String listTitle) {
        this.listTitle = listTitle;
    }
}
