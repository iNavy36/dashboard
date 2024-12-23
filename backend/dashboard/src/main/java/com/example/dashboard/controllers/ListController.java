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

import com.example.dashboard.database.AdminRepository;
import com.example.dashboard.database.BoardRepository;
import com.example.dashboard.database.ListRepository;
import com.example.dashboard.services.ListService;
import com.example.dashboard.exceptions.NotFoundException;
import com.example.dashboard.model.ListEntity;
import com.example.dashboard.query_interfaces.ListShortened;
import com.fasterxml.jackson.annotation.JsonProperty;

@RestController
@RequestMapping("/list")
public class ListController {
    private final ListRepository listRepo;
    private final BoardRepository boardRepo;
    private final AdminRepository adminRepo;

    public ListController(ListRepository listRepo, BoardRepository boardRepo, AdminRepository adminRepo) {
        this.listRepo = listRepo;
        this.boardRepo = boardRepo;
        this.adminRepo = adminRepo;
    }

    @GetMapping("/{id}")
    ListShortened one(@PathVariable Long id) {
        return ListService.getSingleList(this.listRepo.getSingleList(id))
                .orElseThrow(() -> new NotFoundException("list", id));
    }

    @PostMapping(consumes = "application/json")
    ListShortened newList(@RequestBody ListForm list) {
        if (!adminRepo.existsByUserId(list.getUserId()))
            throw new NotFoundException("admin", list.getUserId());
        if (!boardRepo.existsById(list.getBoardId()))
            throw new NotFoundException("board", list.getBoardId());
        return ListService.convertToListShortened(
                listRepo.save(new ListEntity(list.getListTitle(), boardRepo.getReferenceById(list.getBoardId()),
                        adminRepo.getByUserId(list.getUserId()))));
    }

    @PutMapping(consumes = "application/json", value = "/{id}")
    ListShortened updateList(@RequestBody ListForm list, @PathVariable Long id) {
        if (!boardRepo.existsById(list.getBoardId()))
            throw new NotFoundException("admin", list.getBoardId());
        Optional<ListEntity> existingList = listRepo.findById(id);
        if (existingList.isPresent()) {
            ListEntity updatedList = existingList.get();
            updatedList.setName(list.getListTitle());
            return ListService.convertToListShortened(listRepo.save(updatedList));
        } else {
            throw new NotFoundException("list", id);
        }
    }

    @DeleteMapping(consumes = "application/json", value = "/{id}")
    Boolean deleteList(@RequestBody ListForm list, @PathVariable Long id) {
        if (!boardRepo.existsById(list.getBoardId()))
            throw new NotFoundException("board", list.getBoardId());
        listRepo.deleteById(id);
        return true;
    }
}

class ListForm {
    @JsonProperty("board_id")
    private Long boardId;

    @JsonProperty("user_id")
    private Long userId;

    @JsonProperty("list_title")
    private String listTitle;

    public ListForm(Long boardId, Long userId, String listTitle) {
        this.boardId = boardId;
        this.userId = userId;
        this.listTitle = listTitle;
    }

    public Long getBoardId() {
        return boardId;
    }

    public void setBoardId(Long boardId) {
        this.boardId = boardId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getListTitle() {
        return listTitle;
    }

    public void setListTitle(String listTitle) {
        this.listTitle = listTitle;
    }
}
